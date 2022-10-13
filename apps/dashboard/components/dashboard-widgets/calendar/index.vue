<template>
  <div>
    <div id="calendar-header">
      <div id="calendar-info">
        <!-- <div id="calendar-month-info">, {{ title.dateMonth }}</div> -->
      </div>
    </div>

    <!-- <div v-if="!gCalendars" class="calendar-body service-info">Service not available</div> -->

    <!-- <div v-else-if="appointments.length === 0" class="calendar-body no-events-info">
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

        <div v-if="appointments.length > 3" class="preview-calendar-appointment">
          <div
            class="calendar-color-bar"
            :key="appointment.id"
            v-for="appointment in appointments.slice(3, 6)"
            :style="{ background: appointment.calendarColor }"
          ></div>
          <div class="preview-text">{{ appointments.length - 3 }} more events</div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>




</script>


<style lang="scss">
// @import '../../../../../../../libs/style/variables.scss';
#calendar-header {
  height: 15%;
  #calendar-day-info {
    // color: $red;
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