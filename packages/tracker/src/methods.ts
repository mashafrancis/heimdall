/* eslint-disable @typescript-eslint/no-floating-promises */
import { sendVisitor } from './server'
import { getSessionDuration, getUrlParams, guid, q } from './utils/util'

export const track = (name: string, payload: Record<string, any> = {}) => {
  const event = {
    id: guid(),
    eventName: name,
    eventType: 'manual',
    payload,
    page: window.location.pathname,
    referrerPath: window.lli.currentUrl,
    referrerDomain: window.lli.currentRef,
    duration: getSessionDuration(),
    pageId: window.lli.pageId,
    queryParams: getUrlParams(),
  }
  window.llc.customEvents && q(event)
}

export const identify = (payload: Record<string, string>) => {
  window.llc.consent === 'granted' && sendVisitor(payload)
}

export const setConsent = (consent: 'granted' | 'denied') => {
  window.llc.consent = consent
  sendVisitor({ consent })
}
