// Generated by https://quicktype.io

export interface GoogleCalendarResults {
  kind: string
  etag: string
  nextSyncToken: string
  items: Item[]
}

export interface Item {
  kind: string
  etag: string
  id: string
  summary: string
  description?: string
  timeZone: string
  colorId: string
  backgroundColor: string
  foregroundColor: string
  selected: boolean
  accessRole: string
  defaultReminders: DefaultReminder[]
  conferenceProperties: ConferenceProperties
  notificationSettings?: NotificationSettings
  primary?: boolean
  summaryOverride?: string
}

export interface ConferenceProperties {
  allowedConferenceSolutionTypes: string[]
}

export interface DefaultReminder {
  method: string
  minutes: number
}

export interface NotificationSettings {
  notifications: Notification[]
}

export interface Notification {
  type: string
  method: string
}

export interface Event {
  kind: string
  etag: string
  id: string
  status: string
  htmlLink: string
  created: string
  updated: string
  summary: string
  creator: Creator
  organizer: Creator
  start: EventDetails
  end: EventDetails
  iCalUID: string
  sequence: number
  reminders: Reminders
  eventType: string
  calendarColor: string
}

export interface Creator {
  email: string
  self: boolean
}

export interface EventDetails {
  dateTime?: string
  date?: string
  timeZone: string
}

export interface Reminders {
  useDefault: boolean
}