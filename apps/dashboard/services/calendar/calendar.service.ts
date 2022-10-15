import axios from 'axios'
import { Event, Item } from '~~/types/googleCalendarResults'

export class CalendarService {
  // TODO wrap in try catch

  async getGoogleCalendars(): Promise<Item[]> {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('google_access_token')}` }
    }
    const response = await axios.get(
      'https://www.googleapis.com/calendar/v3/users/me/calendarList',
      config
    )

    return response.data.items
  }

  async getGoogleCalendarEvents(calendars: Item[], params: {}): Promise<Event[]> {
    let events: Event[] = []

    const filteredCalenders = calendars.filter((c) => {
      return c.id !== 'e_2_de#weeknum@group.v.calendar.google.com'
    })

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('google_access_token')}` },
      params: params
    }

    for (const calendar of filteredCalenders) {
      const response = await axios.get(
        `https://www.googleapis.com/calendar/v3/calendars/${calendar.id}/events`,
        config
      )

      const calendarColor = await this.getCalendarColor(calendar.id)
      const entries: Event[] = response.data.items.map((event) => ({
        ...event,
        calendarColor: calendarColor
      }))
      events = [...events, ...entries]
    }

    return events
  }
  async getTodayGoogleCalendarEvents(): Promise<Event[]> {
    const calendars = await this.getGoogleCalendars()

    const startDay = new Date(new Date().setHours(0, 0, 0, 0)).toISOString()
    const endDay = new Date(new Date().setHours(23, 59, 59, 999)).toISOString()
    const params = {
      showDeleted: false,
      timeMin: startDay,
      timeMax: endDay
    }
    const dayEvents = await this.getGoogleCalendarEvents(calendars, params)
    return dayEvents
  }

  async getCalendarColor(calendarId: string): Promise<string> {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('google_access_token')}` }
    }

    const response = await axios.get(
      `https://www.googleapis.com/calendar/v3/users/me/calendarList/${calendarId}`,
      config
    )

    return response.data.backgroundColor
  }
}
