import axios from 'axios'

export class CalendarService {
  async getGoogleCalendars() {
    const accessToken = localStorage.getItem('google_access_token')

    const config = {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
    const response = await axios.get(
      'https://www.googleapis.com/calendar/v3/users/me/calendarList',
      config
    )
    return response.data
  }

  async getGoogleCalendarEvents() {
    const accessToken = localStorage.getItem('google_access_token')

    const calendars = await this.getGoogleCalendars()

    const config = {
      headers: { Authorization: `Bearer ${accessToken}` }
    }

    const events = []

    for (const calendar in calendars) {
      const response = await axios.get(
        `https://www.googleapis.com/calendar/v3/calendars/${calendar}`
      )
      events.push(response.data)
    }
  }
}
