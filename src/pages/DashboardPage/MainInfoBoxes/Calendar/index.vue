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
      calendarAppointmentsSorted: [],
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
