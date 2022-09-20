<template>
  <div>
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
      v-else-if="appointments.length === 0"
      class="calendar-body no-events-info"
    >
      No events today
    </div>

    <div v-else class="calendar-body">
      <div class="calendar-events">
        <div class="calendar-next-events">
          <calendar-appointment
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
            class="calendar-color-bar"
            :key="appointment.id"
            v-for="appointment in appointments.slice(3, 6)"
            :style="{ background: appointment.calendarColor }"
          ></div>
          <div class="preview-text">
            {{ appointments.length - 3 }} more events
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from "vue";
  // import { VueGapi } from 'vue-gapi'
  import store from "../../../store";
  import { Entry, Item } from "../../../types/gapiResult";
  import CalendarAppointment from "./CalendarAppointment.vue";

  export default defineComponent({
    components: { CalendarAppointment },
    setup() {
      // const gapi = inject('gapi') as VueGapi

      const gCalendars = ref([] as Item[]);
      const appointments = ref([] as Entry[]);

      const startDay = ref(new Date().setHours(0, 0, 0, 0));
      const endDay = ref(new Date().setHours(23, 59, 59, 999));

      const nextStartDay = computed(() => {
        return new Date(startDay.value).setDate(new Date().getDate() + 1);
      });

      const nextEndDay = computed(() => {
        return new Date(endDay.value).setDate(new Date().getDate() + 1);
      });

      const initClient = async () => {
        // if (!(await gapi.isSignedIn())) {
        //   await gapi.login()
        // }
      };

      const setGoogleCalendars = async () => {
        // const gapiClient = await gapi.getGapiClient()
        // await gapiClient.client.calendar.calendarList
        //   .list()
        //   .then((response: any) => {
        //     gCalendars.value = (response.result as GapiResult).items
        //     getCalendarEvents()
        //   })
        //   .catch((error: Error) => {
        //     console.log(error.message)
        //   })
      };

      const getCalendarEvents = async () => {
        if (gCalendars.value.length == 0) return;
        //remove calendarweeks infos
        let calendars = gCalendars.value.filter(function (obj) {
          return obj.id !== "e_2_de#weeknum@group.v.calendar.google.com";
        });
        for await (let calendar of calendars) {
          let calendarColor = calendar.backgroundColor;
          // const gapiClient = await gapi.getGapiClient()

          // await gapiClient.client.calendar.events
          //   .list({
          //     calendarId: calendar.id,
          //     timeMin: new Date(startDay.value).toISOString(),
          //     timeMax: new Date(endDay.value).toISOString(),
          //     showDeleted: false,
          //     singleEvents: true,
          //     orderBy: 'startTime'
          //   })
          //   .then((response: any) => {
          //     response.result.items.forEach((entry: Entry) => {
          //       if (new Date(entry.end.dateTime) > new Date()) {
          //         entry['calendarColor'] = calendarColor
          //         appointments.value.push(entry)
          //         appointments.value.sort((a, b) =>
          //           new Date(a.start.dateTime) > new Date(b.start.dateTime) ? 1 : -1
          //         )
          //       }
          //     })
          //   })
          //   .catch((error: Error) => {
          //     console.log(error.message)
          //   })
        }
      };
      // if (appointments.length === 0) {
      //     this.showNextDay();
      // }

      const title = computed(() => {
        let now = new Date();
        if (
          appointments.value.length > 0 &&
          new Date(appointments.value[0].start.dateTime).getDate() ==
            new Date(nextStartDay.value).getDate()
        ) {
          let tomorrow: any = now.setDate(now.getDate() + 1);
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
            title: store.state.dayOfTheWeek,
            dateMonth: dateMonth,
          };
        }
      });

      initClient();
      setGoogleCalendars();

      return { gCalendars, appointments, title };
    },
  });
</script>

<style lang="scss">
  @import "../../../../../../../libs/style/variables.scss";
  #calendar-header {
    height: 15%;
    #calendar-day-info {
      color: $red;
      font-weight: bold;
    }
    #calendar-info {
      display: flex;
      font-size: medium;
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
    height: 1rem;
  }
  .preview-text {
    font-size: small;
    margin-left: 0.5vh;
    display: flex;
    height: 1rem;
  }
  .calendar-color-bar {
    width: 3px;
    border-radius: 20px;
    height: 100%;
    margin-right: 2px;
  }
</style>
