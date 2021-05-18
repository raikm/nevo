<template>
  <div class="appointment-entry">
    <div class="left-appointment-entry">
      <div
        class="calendar-color"
        :style="{ background: appointment.calendarColor }"
      ></div>
    </div>

    <div class="right-appointment-entry">
      <div class="appointment-summary">{{ appointment.summary }}</div>

      <div class="appointment-time">
        {{
          new Date(appointment.start.dateTime).toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
          })
        }}
        -
        {{
          new Date(appointment.end.dateTime).toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
          })
        }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["appointment"],
};
</script>

<style lang="scss">
.left-appointment-entry {
  float: left;
  width: 2%;
  height: 100%;
  margin-right: 3%;
}

.right-appointment-entry {
  font-size: $standard-text-medium;
  overflow: hidden;
  display: grid;
  grid-template-rows: 1fr 1fr;
}
.calendar-color {
  height: 100%;
  width: 100%;
  border-radius: 5px;
}

.appointment-entry {
  margin-bottom: 2.5%;
}
.appointment-summary {
  font-size: $standard-text-medium;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  align-self: center;
}

.appointment-time {
  align-self: center;
}
</style>
