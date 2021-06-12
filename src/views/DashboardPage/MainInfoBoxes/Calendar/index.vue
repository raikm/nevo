<template>
  <div class="basic-card large-widget">
    <div id="calendar-header">
      <div id="calendar-info">
        <div id="calendar-day-info">{{ title.title }}</div>
        <div id="calendar-month-info">, {{ title.dateMonth }}</div>
      </div>
    </div>

    <div v-if="!gCalendars" class="calendar-body service-info">
      Service not available
    </div>

    <div
      v-else-if="this.appointments.length === 0"
      class="calendar-body no-events-info"
    >
      No events today
    </div>

    <div v-else class="calendar-body">
      <div class="calendar-events">
        <div class="calendar-next-events">
          <CalendarAppointment
            v-for="appointment in appointments.slice(0, 3)"
            :key="appointment.id"
            :appointment="appointment"
          />
        </div>

        <div
          v-if="appointments.length > 3"
          class="preview-calendar-appointment"
        >
          <div
            :key="appointment.id"
            v-for="appointment in appointments.slice(3, 6)"
          >
            <div
              class="calendar-color-bar"
              :style="{ background: appointment.calendarColor }"
            ></div>
          </div>
          <div class="preview-text">
            {{ appointments.length - 3 }} more events
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CalendarAppointment from "./CalendarAppointment";
import { mapState } from "vuex";

export default {
  components: { CalendarAppointment },
  created() {
    this.connectGoogleApi();
  },
  computed: {
    ...mapState(["config"]),
    nextStartDay() {
      return new Date(this.startDay).setDate(new Date().getDate() + 1);
    },
    nextEndDay() {
      return new Date(this.endDay).setDate(new Date().getDate() + 1);
    },
    title() {
      let now = new Date();
      if (
        this.appointments.length > 0 &&
        new Date(this.appointments[0].start.dateTime).getDate() ==
          new Date(this.nextStartDay).getDate()
      ) {
        let tomorrow = now.setDate(now.getDate() + 1);
        tomorrow = new Date(tomorrow);
        let dateMonth =
          tomorrow.getUTCDate() +
          ". " +
          tomorrow.toLocaleString("default", { month: "long" });
        return { title: "Tomorrow", dateMonth: dateMonth };
      } else {
        let dateMonth =
          now.getUTCDate() +
          ". " +
          now.toLocaleString("default", { month: "long" });
        return {
          title: this.$store.getters.currentDayOfTheWeek,
          dateMonth: dateMonth,
        };
      }
    },
  },
  mounted() {
    // this.getCalendarEvents(this.startDay, this.endDay);
  },
  data() {
    return {
      appointments: [],
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
      if (
        new Date(this.appointments[0].start.dateTime).getDate() !=
          new Date(this.nextStartDay).getDate() &&
        new Date().getHours() >= 18
      ) {
        this.getCalendarEvents(this.nextStartDay, this.nextEndDay);
      }
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
    async getCalendarEvents(startDay, endDay) {
      if (this.gCalendars == null) return;

      //remove calendarweeks infos
      let calendars = this.gCalendars.filter(function(obj) {
        return obj.id !== "e_2_de#weeknum@group.v.calendar.google.com";
      });

      for await (let calendar of calendars) {
        let calendarColor = calendar.backgroundColor;
        await window.gapi.client.calendar.events
          .list({
            calendarId: calendar.id,
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
                this.appointments.push(entry);
                this.appointments.sort((a, b) =>
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
      }
      if (this.appointments.length === 0) {
        this.showNextDay();
      }
    },
  },
};
</script>

<style lang="scss">
#calendar-header {
  height: 15%;
  #calendar-day-info {
    color: $main-red;
    font-weight: bold;
  }

  #calendar-info {
    display: flex;
    font-size: $standard-text-medium;
  }
}
#calendar-body {
  height: 85%;
  width: 100%;
}

.calendar-events {
  height: 100%;
  display: grid;
  grid-template-rows: 95% 5%;

  .calendar-next-events {
    display: flex;
    flex-direction: column;
  }
}

.preview-calendar-appointment {
  display: flex;
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
