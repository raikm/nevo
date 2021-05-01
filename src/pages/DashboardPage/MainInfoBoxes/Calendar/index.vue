<template>
  <div class="basic-card main-info-box-big">
    <div v-if="calendarAppointmentsSorted.length !== 0">
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

export default {
  components: { CalendarAppointment },
  created() {},
  mounted() {
    let unsubscribe = null;
    unsubscribe = this.$store.subscribe(({ type }) => {
      if (type === "setGCalendars") {
        this.getCalendarEvents(
          window.gapi,
          this.$store.getters.googleCalendars
        );
        unsubscribe(); // So it only reacts once.
      }
    });
  },
  methods: {
    getCalendarEvents(gapiClient, calendars) {
      //define start and end of day
      let startDay = new Date();
      startDay.setHours(0, 0, 0, 0);
      let endDay = new Date();
      endDay.setHours(23, 59, 59, 999);
      //remove calendarweeks infos
      calendars = calendars.filter(function(obj) {
        return obj.id !== "e_2_de#weeknum@group.v.calendar.google.com";
      });
      for (let i = 0; i < calendars.length; i++) {
        let calendarColor = calendars[i].backgroundColor;
        gapiClient.client.calendar.events
          .list({
            calendarId: calendars[i].id,
            timeMin: startDay.toISOString(),
            timeMax: endDay.toISOString(),
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
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  data() {
    return {
      calendarAppointmentsSorted: [],
    };
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
