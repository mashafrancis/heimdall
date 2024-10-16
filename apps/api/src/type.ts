import { OperatorType } from './lib/small-filter'

export type Path =
  | '/session'
  | '/pageview'
  | '/session/pulse'
  | '/event'
  | '/visitor'
  | '/test'
  | '/insight'
  | '/hits'

export type Filter<T> = {
  key: keyof T
  value: T[keyof T]
  operator: OperatorType<T[keyof T]>
}

export type HeimdallEvent = {
  id: string
  timestamp: string
  event: 'hits' | string
  sessionId: string
  city: string
  country: string
  browser: string
  language: string
  currentPath: string
  referrerPath: string
  referrerDomain: string
  queryParams: string
  device: string
  duration: number
  os: string
  visitorId: string
  websiteId: string
}

export type HeimdallTrackerEvent = {
  screenWidth: number
  language: string
  currentUrl: string
  referrerUrl: string
  queryParams: Record<string, string>
  duration: number
  host: string
  sessionId: string
  visitorId: string
  sdkVersion: string
}

export type EventRes = {
  id: string
  event: string
  sessionId: string
  visitorId: string
  properties: string
  timestamp: string
  websiteId: string
}

export type TraceRes = {
  Timestamp: string
  TraceId: string
  SpanId: string
  ParentSpanId: string
  SpanName: string
  SpanKind: string
  ServiceName: string
  ResourceAttributes: Record<string, string>
  SpanAttributes: Record<string, string>
  Duration: string
  StatusCode: string
  StatusMessage: string
  Events: {
    Timestamp: Array<string>
    Name: Array<string>
    Attributes: Array<Record<string, string>>
  }
  Links: {
    TraceId: Array<string>
    SpanId: Array<string>
    TraceState: Array<string>
    Attributes: Array<Record<string, string>>
  }
}
