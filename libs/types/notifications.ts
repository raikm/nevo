export interface Notification {
  type: 'plants' | 'devices' // TODO: enum
  title: String
  description: String
  created: Date
  archived: Boolean
}
