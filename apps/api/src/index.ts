import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import jwt from 'jsonwebtoken'

import { clickhouseClient as client, client } from '@heimdall-logs/db'
import { type VitalData } from '@heimdall-logs/types/tracker'
import { detect } from 'detect-browser'
import { showRoutes } from 'hono/dev'
import { eventDB } from './db'
import { hitsQuery } from './db/queries'
import { rateLimitCheck } from './lib/rate-limit'
import { retryFunction } from './lib/retry'
import { filter } from './lib/small-filter'
import { convertToUTC } from './lib/utils'
import { router } from './routes'
import { getInsight } from './routes/insight'
import { getTablesData } from './routes/table'
import { getVitalsData } from './routes/vital-graph-table'
import { getVitalInsight } from './routes/vital-insight'
import { apiQuery, insightPubApiSchema, insightSchema } from './schema'
import type { Filter, HeimdallEvent, Path } from './type'

const app = new Hono({ strict: false })

app.use('*', logger())
app.use('*', cors())

app.get('/ping', (c) => c.json({ ping: 'pong' }, 200))

app.post('/', async (c) => {
  const body = await c.req.json()
  const headers = Object.fromEntries(c.req.raw.headers)
  const query = c.req.query()
  if (!body.path) {
    return c.json(null, 200)
  }
  const path: Path = body.path
  const res = await router({ path, rawBody: body, req: { headers, query } })
  return c.json(null, res.status)
})

app.post('/vitals', async (c) => {
  const body = await c.req.json<VitalData[]>()
  const headers = Object.fromEntries(c.req.raw.headers)
  const query = c.req.query()
  const sessionData = await detect({ headers, query }, body[0].screenWidth)
  // const usage = checkUsage(body[0].websiteId)
  // if (!usage) {
  //   return c.json(null, 403)
  // }
  await eventDB.insertEvents(
    body.map((data) => {
      const { sessionId, visitorId, id, websiteId, ...rest } = data
      return {
        properties: JSON.stringify({
          ...sessionData,
          ...rest,
        }),
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
        event: 'vitals',
        sessionId,
        visitorId,
        websiteId,
        id: id,
        sign: 1,
      }
    }),
  )
  return c.json(null, 200)
})

app.get('/vitals', async (c) => {
  const startDateObj = new Date(c.req.query('startDate'))
  const endDateObj = new Date(c.req.query('endDate'))
  const duration = endDateObj.getTime() - startDateObj.getTime()
  const pastEndDateObj = new Date(startDateObj.getTime() - duration)
  const websiteId = c.req.query('websiteId')
  const timezone = c.req.query('timezone')
  try {
    const [events, lastEvents] = await retryFunction(
      eventDB.getVital,
      [startDateObj, endDateObj, pastEndDateObj, websiteId],
      3,
      4,
    )
    const insight = getVitalInsight(events, lastEvents)
    const vitalsData = getVitalsData(events, startDateObj, endDateObj, timezone)
    return c.json(
      {
        ...insight,
        graph: vitalsData.dataByDate,
        data: vitalsData.data,
      },
      200,
    )
  } catch (e) {
    console.error(e)
    return c.json(null, 500)
  }
})

app.get('/', async (c) => {
  //authentication
  const queries = insightSchema.safeParse(c.req.query())
  if (!queries.success) {
    return c.json(null, 400)
  }
  const { startDate, endDate, timeZone, websiteId, token } = queries.data
  try {
    jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
      if (err) {
        throw err
      }
      if (decoded.website !== websiteId) {
        throw Error
      }
    })
  } catch {
    return c.json(null, 401)
  }
  const startDateObj = new Date(startDate)
  const endDateObj = new Date(endDate)
  const duration = endDateObj.getTime() - startDateObj.getTime()
  const pastEndDateObj = new Date(startDateObj.getTime() - duration)
  try {
    const tick = performance.now()
    let [events, lastEvents] = await retryFunction(
      eventDB.getHits,
      [startDateObj, endDateObj, pastEndDateObj, websiteId],
      3,
      4,
    )
    const tack = performance.now()
    console.log(tack - tick, 'ms taken to query')
    const filters = JSON.parse(queries.data.filter) as Filter<HeimdallEvent>[]
    console.log(filters, 'filters')
    //add utm as a key in session
    events = events.map((s) => {
      const queryParams = JSON.parse(s.queryParams)
      const utmCampaign = queryParams?.utm_campaign ?? ''
      const utmSource = queryParams?.utm_source ?? ''
      return { ...s, utmCampaign, utmSource }
    })

    //add utm as a key in session
    lastEvents = lastEvents.map((s) => {
      const queryParams = JSON.parse(s.queryParams)
      const utmCampaign = queryParams?.utm_campaign ?? ''
      const utmSource = queryParams?.utm_source ?? ''
      return { ...s, utmCampaign, utmSource }
    })

    filters.length &&
      filters.forEach((f) => {
        events = filter(events).where(f.key, f.operator, f.value).execute()
        lastEvents = filter(lastEvents as HeimdallEvent[])
          .where(f.key, f.operator, f.value)
          .execute()
      })
    const insightData = getInsight(
      events as HeimdallEvent[],
      lastEvents as HeimdallEvent[],
    )
    const tableData = getTablesData(
      events as HeimdallEvent[],
      startDateObj,
      endDateObj,
      timeZone,
    )
    return c.json(
      {
        insight: insightData,
        ...tableData,
      },
      200,
    )
  } catch (e) {
    return c.json(e, 500)
  }
})

//TODO: should be changed the json to be parsed from clickhouse than js
app.get('/events', async (c) => {
  const startDateObj = new Date(c.req.query('startDate'))
  const endDateObj = new Date(c.req.query('endDate'))
  const websiteId = c.req.query('websiteId')
  try {
    const res = await eventDB.getCustomEvents(
      startDateObj,
      endDateObj,
      websiteId,
    )
    const events = res.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )
    return c.json(events, 200)
  } catch {
    return c.json(null, 500)
  }
})

//TODO: should be changed the json to be parsed from clickhouse than js
app.get('/traces', async (c) => {
  const startDateObj = new Date(c.req.query('startDate'))
  const endDateObj = new Date(c.req.query('endDate'))
  const websiteId = c.req.query('websiteId')
  try {
    const res = await eventDB.getTraces(startDateObj, endDateObj, websiteId)
    const events = res.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )
    return c.json(events, 200)
  } catch {
    return c.json(null, 500)
  }
})

//api/v1
app.use('/v1/*', async (_, next) => {
  return await next()
})

app.get('/v1/hits', async (c) => {
  const query = c.req.query()
  const apiKey = c.req.headers.get('x-api-key')
  if (!apiKey) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  const site = await client.query.apiKey.findFirst({
    where(fields, operators) {
      return operators.and(operators.eq(fields.token, apiKey))
    },
  })
  if (!site) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  const data = apiQuery.safeParse(query)
  if (!data.success) {
    return c.json({ message: 'Bad request' }, 400)
  }
  const { startDate, endDate } = data.data
  const websiteId = site.websiteId
  const startDateObj = new Date(startDate)
  const endDateObj = new Date(endDate)

  async function getData() {
    return await client
      .query({
        query: hitsQuery(
          convertToUTC(startDateObj),
          convertToUTC(endDateObj),
          websiteId,
        ),
        format: 'JSONEachRow',
      })
      .then(async (res) => (await res.json()) as HeimdallEvent[])
  }

  const res = await retryFunction(getData, [], 3, 4)
  return c.json(res, 200)
})

app.get('/v1/insight', async (c) => {
  const queries = insightPubApiSchema.safeParse(c.req.query())
  if (!queries.success) {
    return c.json(null, 400)
  }
  const { startDate, endDate, timeZone } = queries.data
  const apiKey = queries.data.apiKey
  const isRateLimited = await rateLimitCheck(apiKey)
  if (isRateLimited) {
    return c.json(
      {
        message: 'Rate limit exceeded',
      },
      429,
    )
  }
  const site = await client.query.apiKey.findFirst({
    where(fields, operators) {
      return operators.and(operators.eq(fields.token, apiKey))
    },
  })
  if (new Date().getTime() >= site.expiresAt.getTime()) {
    return c.json(
      {
        message: 'API key expired!',
      },
      400,
    )
  }
  if (site.createdAt >= site.expiresAt) {
    return c.json(
      {
        message: 'API Token Expired!',
      },
      400,
    )
  }
  if (!site) {
    return c.json(
      {
        message: 'Unauthorized',
      },
      401,
    )
  }
  const websiteId = site.websiteId
  const today = new Date()
  const startDateObj = new Date(
    startDate ??
      new Date(
        today.getFullYear() - 1,
        today.getMonth(),
        today.getDate(),
      ).toISOString(),
  )
  const endDateObj = new Date(endDate ?? today)
  const duration = endDateObj.getTime() - startDateObj.getTime()
  const pastEndDateObj = new Date(startDateObj.getTime() - duration)
  try {
    let [events, lastEvents] = await retryFunction(
      eventDB.getHits,
      [startDateObj, endDateObj, pastEndDateObj, websiteId],
      3,
      4,
    )
    const filters = JSON.parse(queries.data.filter) as Filter<HeimdallEvent>[]
    filters.length &&
      filters.forEach((f) => {
        events = filter(events).where(f.key, f.operator, f.value).execute()
        lastEvents = filter(lastEvents as HeimdallEvent[])
          .where(f.key, f.operator, f.value)
          .execute()
      })
    const insightData = getInsight(
      events as HeimdallEvent[],
      lastEvents as HeimdallEvent[],
    )
    const tableData = getTablesData(
      events as HeimdallEvent[],
      startDateObj,
      endDateObj,
      timeZone,
    )
    return c.json(
      {
        insight: insightData,
        ...tableData,
      },
      200,
    )
  } catch (e) {
    return c.json(e, 500)
  }
})

const isDev = process.env.NODE_ENV === 'development'
if (isDev) showRoutes(app, { verbose: true })

const port = isDev ? 8000 : 8000

const server = { port, fetch: app.fetch }

export default server
