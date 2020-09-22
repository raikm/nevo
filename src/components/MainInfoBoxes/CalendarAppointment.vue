<template>
  <div class="calendar-entry-box">
    <div class="left-calendar-entry-box-container">
      <div class="calendar-color" :style="{background: appointment.calendarColor}"></div>
    </div>
    <div class="right-calendar-entry-box-container">
      <div class="calendar-title">{{ appointment.title }}</div>
      <div class="calendar-time">
        {{ appointment.startDate }} - {{ appointment.endDate }}
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
  font-weight: bold;
}

.left-calendar-entry-box-container{
    float: left;
    width: 2%;
    height: 100%;
    margin-right: 3%;
}

.right-calendar-entry-box-container{
    overflow: hidden;
}


.calendar-entry-box {
  height: 5vh;
}
</style>
