<template>
  <div class="basic-card main-info-box-big">
    <div id="calendar-header">
      <div id="day-info"><span id="day-span">Tuesday</span><span id="month-span"> November</span></div>
      <div id="user-infos" :key="user.id" v-for="user in users">
        <div class="user-info-circle">
          <div class="circle click-element">{{ user.short }}</div>
        </div>
      </div>
    </div>
    <div id="calendar-info-box">
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
      users: [
        {
          id: 1,
          short: "RM",
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
      day: new Date().getUTCDate(),
      calendarAppointments: [
        {
          id: 1,
          calendarColor: "#fe6f4c",
          title: "Telko with Ben & Chris",
          location: "Zoom",
          startDate: new Date('December 17, 2020 10:00:00').toJSON().slice(11, 16),
          endDate: new Date('December 17, 2020 10:30:00').toJSON().slice(11, 16),
        },
        {
          id: 2,
          calendarColor: "#02b378",
          title: "Lunch with Anna",
          location: "220 Café",
          startDate: new Date('December 17, 2020 13:00:00').toJSON().slice(11, 16),
          endDate: new Date('December 17, 2020 14:00:00').toJSON().slice(11, 16),
        },
        {
          id: 3,
          calendarColor: "#02b378",
          title: "Stretching Routine",
          location: "Gym",
          startDate: new Date('December 17, 2020 15:00:00').toJSON().slice(11, 16),
          endDate: new Date('December 17, 2020 15:30:00').toJSON().slice(11, 16),
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "../../style/main-colors";

#calendar-header {
  display: grid;
  grid-template-columns: 4fr 1fr 1fr 1fr;
  margin-bottom: 1vh;;
}

#day-span{
  color: $main-red;
  font-weight: bold;
}

#user-infos {
}
#day-info{
  font-size: larger;
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
</style>
