<template>
  <div class="basic-card main-info-box-big">
    <div v-if="gCalendars">
      <div id="calendar-header">
        <div id="day-info">
          <span id="day-span">{{
            this.$store.getters.currentDayOfTheWeek
          }}</span
          ><span id="month-span"
            >,
            {{
              new Date().getUTCDate() +
                ". " +
                new Date().toLocaleString("default", { month: "long" })
            }}</span
          >
        </div>
      </div>
      <div id="calendar-info-box">
        <div class="main-info-content">
          <div
            id="calendar-appointment"
            :key="appointment.id"
            v-for="appointment in calendarAppointmentsSorted.slice(0, 3)"
          >
            <CalendarAppointment :appointment="appointment" />
          </div>
          <div
            v-if="calendarAppointmentsSorted.length > 3"
            class="preview-calendar-appointment"
          >
            <div
              :key="appointment.id"
              v-for="appointment in calendarAppointmentsSorted.slice(3, 6)"
            >
              <div
                class="calendar-color-bar"
                :style="{ background: appointment.calendarColor }"
              ></div>
            </div>
            <div class="preview-text">
              {{ calendarAppointmentsSorted.length - 3 }} more events
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="service-info">
      Service not available
    </div>
  </div>
</template>

<script>
import CalendarAppointment from "./CalendarAppointment";
import { mapGetters } from "vuex";

export default {
  components: { CalendarAppointment },
  created() {
    this.connectGoogleApi();
  },
  computed: {
    ...mapGetters(["config"]),
    nextStartDay() {
      return new Date(this.startDay).setDate(new Date().getDate() + 1);
    },
    nextEndDay() {
      return new Date(this.endDay).setDate(new Date().getDate() + 1);
    },
  },
  mounted() {
    // this.getCalendarEvents(this.startDay, this.endDay);
  },
  data() {
    return {
      calendarAppointmentsSorted: [
        {
          kind: "calendar#event",
          etag: '"3240921344999000"',
          id: "_6kskchi48gqj6ba67114cb9k8l132b9o68p3cb9o652jec1l6gq44d1k6c",
          status: "confirmed",
          htmlLink:
            "https://www.google.com/calendar/event?eid=XzZrc2tjaGk0OGdxajZiYTY3MTE0Y2I5azhsMTMyYjlvNjhwM2NiOW82NTJqZWMxbDZncTQ0ZDFrNmMgY19sODEwYjZjY3UzMmJ0NzE4bnUxM2c2aGdkc0Bn",
          created: "2021-05-08T07:54:22.000Z",
          updated: "2021-05-08T08:00:47.231Z",
          summary: "Homeproject",
          creator: { email: "mail@raik-mueller.com" },
          organizer: {
            email: "c_l810b6ccu32bt718nu13g6hgds@group.calendar.google.com",
            displayName: "Meals",
            self: true,
          },
          start: {
            dateTime: "2021-05-08T14:00:00+02:00",
            timeZone: "Europe/Vienna",
          },
          end: {
            dateTime: "2021-05-08T16:00:00+02:00",
            timeZone: "Europe/Vienna",
          },
          iCalUID: "59FFDD53-F8BF-4EB1-8226-81E70544B443",
          sequence: 1,
          reminders: { useDefault: false },
          eventType: "default",
          calendarColor: "#0095ff",
        },
        {
          kind: "calendar#event",
          etag: '"3240921308647000"',
          id: "_652kcc2368pk6b9j75338b9k88p30ba284s4ab9h60rkacpg8go4adi468",
          status: "confirmed",
          htmlLink:
            "https://www.google.com/calendar/event?eid=XzY1MmtjYzIzNjhwazZiOWo3NTMzOGI5azg4cDMwYmEyODRzNGFiOWg2MHJrYWNwZzhnbzRhZGk0NjggY19sODEwYjZjY3UzMmJ0NzE4bnUxM2c2aGdkc0Bn",
          created: "2021-05-08T07:54:10.000Z",
          updated: "2021-05-08T08:00:58.094Z",
          summary: "Dinner with Friends",
          creator: { email: "mail@raik-mueller.com" },
          organizer: {
            email: "c_l810b6ccu32bt718nu13g6hgds@group.calendar.google.com",
            displayName: "Meals",
            self: true,
          },
          start: {
            dateTime: "2021-05-09T18:00:00+02:00",
            timeZone: "Europe/Vienna",
          },
          end: {
            dateTime: "2021-05-09T20:00:00+02:00",
            timeZone: "Europe/Vienna",
          },
          iCalUID: "1EF0C23C-39F4-4B20-BA8E-107E30D0E6D2",
          sequence: 1,
          reminders: {
            useDefault: false,
            overrides: [{ method: "popup", minutes: 10 }],
          },
          eventType: "default",
          calendarColor: "#ffea00",
        },
      ],
      gCalendars: null,
      startDay: new Date().setHours(0, 0, 0, 0),
      endDay: new Date().setHours(23, 59, 59, 999),
    };
  },
  methods: {
    connectGoogleApi() {
      window.gapi.load("client:auth2", this.initGoogleClient);
    },
    initGoogleClient() {
      const {
        api_key,
        discovery_docs,
        client_id,
        scope,
      } = this.config.google_calendar;

      window.gapi.client
        .init({
          apiKey: api_key,
          discoveryDocs: discovery_docs,
          clientId: client_id,
          scope: scope,
          ux_mode: "redirect",
          redirect_uri: "http://localhost:8081/",
        })
        .then(() => {
          // Listen for sign-in state changes.
          window.gapi.auth2
            .getAuthInstance()
            .isSignedIn.listen(this.updateSigninStatus);

          // Handle the initial sign-in state.
          this.updateSigninStatus(
            window.gapi.auth2.getAuthInstance().isSignedIn.get()
          );
        })
        .catch((error) => {
          console.error(error);
        });
    },
    updateSigninStatus(isSignedIn) {
      if (isSignedIn) {
        this.setGoogleCalendars();
      } else {
        console.log("Google Service not set up");
      }
    },
    showNextDay() {
      this.getCalendarEvents(this.nextStartDay, this.nextEndDay);
    },
    setGoogleCalendars() {
      window.gapi.client.calendar.calendarList
        .list()
        .then((response) => {
          this.gCalendars = response.result.items;
          this.getCalendarEvents(this.startDay, this.endDay);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCalendarEvents(startDay, endDay) {
      if (this.gCalendars == null) return;
      console.log("getCalendarEvent:" + new Date(startDay));
      //remove calendarweeks infos
      let calendars = this.gCalendars.filter(function(obj) {
        return obj.id !== "e_2_de#weeknum@group.v.calendar.google.com";
      });
      for (let i = 0; i < calendars.length; i++) {
        let calendarColor = calendars[i].backgroundColor;
        window.gapi.client.calendar.events
          .list({
            calendarId: calendars[i].id,
            timeMin: new Date(startDay).toISOString(),
            timeMax: new Date(endDay).toISOString(),
            showDeleted: false,
            singleEvents: true,
            orderBy: "startTime",
          })
          .then((response) => {
            response.result.items.forEach((entry) => {
              if (new Date(entry.end.dateTime) > new Date()) {
                entry["calendarColor"] = calendarColor;
                this.calendarAppointmentsSorted.push(entry);
                this.calendarAppointmentsSorted.sort((a, b) =>
                  new Date(a.start.dateTime) > new Date(b.start.dateTime)
                    ? 1
                    : -1
                );
              }
            });
          })
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
        // console.log("before?");
      }

      // if (this.calendarAppointmentsSorted.length === 0) {
      //   this.showNextDay()
      // }
    },
  },
};
</script>

<style lang="scss">
#calendar-header {
  display: grid;
  grid-template-columns: 4.5fr 1fr 1fr 1fr;
  margin-bottom: 1vh;
}

#day-span {
  color: $main-red;
  font-weight: bold;
}

#user-infos {
}
#day-info {
  font-size: $standard-text-medium;
  justify-self: left;
  align-self: center;
}

#calendar-info-box {
  float: left;
  margin-right: 10px;
  width: 100%;
}

.preview-calendar-appointment {
  display: flex;
  height: 2vh;
  width: 100%;
}

.preview-text {
  font-size: $standard-text-small;
  margin-left: 0.5vh;
  display: flex;
}

.calendar-color-bar {
  width: 3px;
  border-radius: 20px;
  height: 100%;
  margin-right: 2px;
}
</style>
