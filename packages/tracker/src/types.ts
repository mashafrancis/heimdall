export interface VitalData {
  visitorId: string
  sessionId: string
  websiteId: string
  sdkVersion: string
  screenWidth: number
  language: string
  queryParams: Record<string, string>
  currentPath: string
  id: string
  delta: number
  value: number
  name: string
  rating: 'good' | 'needs-improvement' | 'poor'
  navigationType: string
}

export interface VitalDateWithSession {
  visitorId: string
  sessionId: string
  websiteId: string
  language: string
  queryParams: Record<string, string>
  currentPath: string
  id: string
  delta: number
  value: number
  name: string
  rating: 'good' | 'needs-improvement' | 'poor'
  navigationType: string
  city: string
  country: string
  browser: string
  os: string
  device: string
  timestamp: Date
  properties: any
}

export type Config = {
  /** The ID of the tracker instance */
  id: string
  /** Whether to automatically track events. Currently only supports click events with onclick handlers or clicks on a button. */
  autoTrack?: boolean
  /** Collect web vitals for speed insights. True by default. */
  webVitals?: boolean
  /**
   * Collect page analytics for page insights. This true by default.
   */
  pageAnalytics?: boolean
  /**
   * custom events collected using the tracker will be ignored if you turn this off.
   */
  customEvents?: boolean
  /** Whether to enable debug logging. */
  debug?: boolean
  /** The environment to use for tracking. */
  env?: 'auto' | 'prod' | 'dev'
  /** The interval (in milliseconds) for sending data to the server. */
  postInterval?: number
  /** The hostname or array of hostnames to send data to. By default it sends to the api.loglib.io */
  host?: string | string[]
  /** The user's consent status for tracking.
   * If not granted, it uses a hashed version of the user ip address as user id.
   * If granted, it stores userId on local storage.
   * By default, it's denied.
   * You can set it globally here,
   * or You can change the user consent
   * using the setConsent method exported from the tracker..
   * @example import {setConsent} from "@loglib/tracker"
   * setConsent("granted") */
  consent?: 'granted' | 'denied'
  useServerPath?: boolean
  useBeacon?: boolean
  collector?: string
}
export type ServerEvents = {
  id: string
  eventName: string
  eventType: string
  payload: Record<string, string>
  page: string
}

export interface DomEvent extends Event {
  target: EventTarget & Element & HTMLFormElement
}

export interface Internal {
  eventsBank: ServerEvents[]
  startTime: number
  currentUrl: string
  currentRef: string
  timeOnPage: number
  pageId: string
  sessionId: string
  intervals: NodeJS.Timer[]
  sdkVersion: string
  vitalQueue: Set<VitalData>
  eventsQueue: Set<any>
}

export interface InitInfo {
  pathname: string
  host: string
  referrer: string
  queryParams: {
    [k: string]: string
  }
  screenWidth: number
  language: string
}

declare global {
  interface Window {
    llc: Config
    lli: Internal
    // heimdalla?: (
    //   event: 'beforeSend' | 'event' | 'pageview',
    //   properties?: unknown,
    // ) => void
    // heimdallq?: [string, unknown?][]
    heimdall: {
      record: (config: Partial<Config>) => void
      track: (name: string, payload?: Record<string, any>) => void
      identify: (payload: Record<string, string>) => void
      setConsent: (consent: 'granted' | 'denied') => void
    }
  }
}
