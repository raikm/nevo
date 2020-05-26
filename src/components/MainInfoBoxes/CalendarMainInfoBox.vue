<template>
  <div class="main-info-box main-info-box-big">
    <div id="calendar-info-box" :calendarInfos="calendarInfos">
      <div class="main-info-header">
        <img
          class="main-info-icon"
          src="../../../public/img/icons/calendar.svg"
        />
        <h1 class="main-info-title" id="calendar-header">
          Next up
        </h1>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarMainInfoBox",
  components: {},
  props: [],
  data() {
    return {
      calendarInfos: {
        id: 1,
        value: 70,
      },
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
