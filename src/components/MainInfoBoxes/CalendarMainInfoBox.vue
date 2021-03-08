<template>
  <div class="basic-card main-info-box-big">
    <div id="calendar-header">
      <div id="day-info">
        <span id="day-span">{{this.$store.getters.getCurrentDayOfTheWeek}}</span><span id="month-span">, {{ new Date().getUTCDate() + ". " + new Date().toLocaleString('default', { month: 'long' })}}</span>
      </div>
      <!-- <div id="user-infos" :key="user.id" v-for="user in users">
        <div class="user-info-circle click-element">
          <div class="circle click-element">{{ user.short }}</div>
        </div>
      </div> -->
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
</template>

<script>
import CalendarAppointment from "./CalendarAppointment";

export default {
  name: "CalendarMainInfoBox",
  components: { CalendarAppointment },
  created() {},
  mounted() {
    let unsubscribe = null;

    unsubscribe = this.$store.subscribe(({ type }) => {
      if (type === "setGCalendars") {
        this.$gapi.getGapiClient().then((gapi) => {
          this.getCalendarEvents(gapi, this.$store.getters.getCalendars);
        });
        unsubscribe(); // So it only reacts once.
        // console.log(this.calendarAppointmentsSorted)
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
      for (var i = 0; i < calendars.length; i++) {
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
            // console.log(response.result.items);
            if (response.result.items.length > 0) {
              response.result.items.forEach((entry) => {
                entry["calendarColor"] = calendarColor;
                this.calendarAppointmentsSorted.push(entry);
                this.calendarAppointmentsSorted.sort((a, b) => ((new Date(a.start.dateTime)) > (new Date(b.start.dateTime))) ? 1 : -1)
              });
            }
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
      users: [
        {
          id: 1,
          short: "RM",
          //calendar_ID
        },
        {
          id: 2,
          short: "VN",
        },
        {
          id: 3,
          short: "AR",
        },
      ],  
  
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
.user-info-circle {
}
.circle {
  float: right;
  text-align: center;
  vertical-align: middle;
  font-weight: 500;
  line-height: 2.9vh;
  border-radius: 50%;
  border: 0px solid;
  background-color: $main-white;
  color: $main-blue;
  height: 2.9vh;
  width: 2.9vh;
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
