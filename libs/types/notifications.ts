export interface Notification {
  type: 'plants' | 'devices'
  title: String
  description?: String
  created: Date
  archived: Boolean
}
