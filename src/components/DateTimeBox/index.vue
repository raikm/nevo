<template>
  <div>
    <div id="time-container">{{ this.time }}</div>
    <div id="day-summary"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: "",
    };
  },
  mounted() {
    this.interval = setInterval(() => {
      this.defineCurrentFormatedTime();
    }, 1000);
  },
  destroyed() {
    clearInterval(this.interval);
    this.connection.suspend();
  },
  methods: {
    defineCurrentFormatedTime() {
      const date = new Date();
      this.time =
        date.getHours() +
        ":" +
        (date.getMinutes() < 10 ? "0" : "") +
        date.getMinutes();
    },
  },
};
</script>

<style lang="scss">
#time-container {
  font-size: $standard-title-big;
  justify-self: flex-end;
  text-align: center;
  margin-right: 1.6%;
  // width: 30%;
}
</style>
