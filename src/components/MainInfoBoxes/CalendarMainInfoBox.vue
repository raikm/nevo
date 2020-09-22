<template>
  <div class="basic-card main-info-box main-info-box-big">
    <div id="calendar-info-box" :calendarInfos="calendarInfos">
      <div class="main-info-header">
        <div class="main-info-icon-container">
          <div class="info-icon-text">{{ this.day }}</div>
        </div>
        <h1 class="main-info-title" id="calendar-header">
          Up next
        </h1>
      </div>
      <div class="main-info-content">
        <div
          id="calendar-appointment"
          :key="appointment.id"
          v-for="appointment in calendarAppointments"
        >
          <CalendarAppointment :appointment="appointment" />
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
  props: [""],
  data() {
    return {
      calendarInfos: {
        id: 1,
        value: 70,
      },
      day: new Date().getUTCDate(),
      calendarAppointments: [
        {
          id: 1,
          calendarColor: "#fe6f4c",
          title: "Telko with Ben & Chris",
          startDate: new Date().toJSON().slice(11, 16),
          endDate: new Date().toJSON().slice(11, 16),
        },
        {
          id: 2,
          calendarColor: "#02b378",
          title: "Lunch with Anna",
          startDate: new Date().toJSON().slice(11, 16),
          endDate: new Date().toJSON().slice(11, 16),
        },
        {
          id: 3,
          calendarColor: "#02b378",
          title: "Stretching Routine",
          startDate: new Date().toJSON().slice(11, 16),
          endDate: new Date().toJSON().slice(11, 16),
        },
      ],
    };
  },
};
</script>

<style lang="scss">
#calendar-info-box {
  float: left;
  margin-right: 10px;
  width: 100%;
}
</style>
