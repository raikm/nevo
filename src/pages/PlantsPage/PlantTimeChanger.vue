<template>
  <div class="time-button-container">
    <button class="time-button" @click="changeRange(borderHalfDayRange)">12h</button>
    <button class="time-button" @click="changeRange(borderDayRange)">24h</button>
    <button class="time-button" @click="changeRange(borderWeekRange)">7d</button>
    <!-- <button class="time-button" @click="changeRange(borderMonthRange)">14d</button> -->
  </div>
</template>

<script>
export default {
  name: "PlantTimeChanger",
  props: ["borderRange"],
  mounted: function() {
    
  },
  data() {
    return {
      borderHalfDayRange: {start: new Date((new Date()).setHours(new Date().getHours() - 12)), end: Date.now()},
      borderDayRange: {start: new Date((new Date()).setHours(new Date().getHours() - 24)), end: Date.now()},
      borderWeekRange: {start: new Date((new Date()).setDate(new Date().getDate() - 7)), end: Date.now()},
      borderMonthRange: {start: new Date((new Date()).setDate(new Date().getDate() - 14)), end: Date.now()},
    }
  },
  methods: {
    changeRange(newRange){
      var _borderRange = this.borderRange
      _borderRange = newRange;
      this.$emit("update-range", _borderRange);
    }
  }
};
</script>

<style lang="scss">

</style>
