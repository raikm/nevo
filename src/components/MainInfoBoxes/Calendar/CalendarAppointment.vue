<template>
  <div class="calendar-entry-box">
    <div class="left-calendar-entry-box-container">
      <div class="calendar-color" :style="{background: appointment.calendarColor}"></div>
    </div>
    <div class="right-calendar-entry-box-container">
      <span class="calendar-title">{{ appointment.summary }}</span>
      <span v-if="appointment.location" class="calendar-location"> - {{ appointment.location }}</span>
      <div class="calendar-time">
        {{ new Date(appointment.start.dateTime).toLocaleTimeString("de-DE", {hour: '2-digit', minute:'2-digit'}) }} - {{ new Date(appointment.end.dateTime).toLocaleTimeString("de-DE", {hour: '2-digit', minute:'2-digit'}) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarAppointment",
  components: {},
  props: ["appointment"],
  data() {
    return {};
  },
};
</script>

<style lang="scss">



.calendar-color{
    height: 90%;
    width: 100%;
    border-radius: 5px;
}
.calendar-title{
  font-size: $standard-text-medium;
  font-weight: bold;
}

.calendar-location{
  color: $main-gray;
}

.left-calendar-entry-box-container{
    float: left;
    width: 2%;
    height: 100%;
    margin-right: 3%;
}

.right-calendar-entry-box-container{
  font-size: $standard-text-medium;
    overflow: hidden;
}


.calendar-entry-box {
  height: 5vh;
}
</style>
