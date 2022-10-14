import axios from 'axios'
import { Entry, Item } from '~~/types/gapiResult'

interface googleCalendar {
  calendarName: string
  entries: Entry[]
}

export class CalendarService {
  // TODO wrap in try catch

  async getGoogleCalendars(): Promise<Item[]> {
    const accessToken = localStorage.getItem('google_access_token')

    const config = {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
    const response = await axios.get(
      'https://www.googleapis.com/calendar/v3/users/me/calendarList',
      config
    )

    return response.data.items
  }

  async getGoogleCalendarEvents(): Promise<googleCalendar[]> {
    const calendars = await this.getGoogleCalendars()

    const accessToken = localStorage.getItem('google_access_token')
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` }
    }

    const filteredCalenders = calendars.filter((c) => {
      return c.id !== 'e_2_de#weeknum@group.v.calendar.google.com'
    })

    const googleCalendars: googleCalendar[] = []

    for (const calendar of filteredCalenders) {
      const response = await axios.get(
        `https://www.googleapis.com/calendar/v3/calendars/${calendar.id}/events`,
        config
      )
      const allEvents = response.data.items
      const weekEvents = allEvents

      googleCalendars.push({ calendarName: calendar.summary, entries: weekEvents })
    }
    console.log(googleCalendars)
    return googleCalendars
  }

  getThisWeekEvents(entries: Entry[]) {}
}
