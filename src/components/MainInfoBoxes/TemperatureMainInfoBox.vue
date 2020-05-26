<template>
  <div class="main-info-box">
    <div id="temperautre-info-box" :temperatureInfo="temperatureInfo">
      <div class="main-info-header">
        <img
          id="temperature-icon"
          src="../../../public/img/icons/thermometer.svg"
        />
        <h1 class="main-info-title" id="temperature-header">
          Indoor temperature
        </h1>
      </div>
      <div v-if="temperatureInfo.value != 99">
        <span id="temperature-value">+{{ temperatureInfo.value }}°C</span>
      </div>
      <div v-else>
        <span id="temperature-value" style="padding-left: 2vh">--</span>
      </div>
    </div>
    <div id="temperature-controller"></div>
  </div>
</template>

<script>
export default {
  name: "TemperatureMainInfoBox",
  components: {},
  props: [],
  data() {
    return {
      temperatureInfo: {
        id: 1,
        value: 21.2,
      },
    };
  },
};
</script>

<style lang="scss">
#temperautre-info-box {
  float: left;
  margin-right: 10px;
}

#temperature-icon {
  float: left;
  height: 3vh;
}

#temperature-value {
  font-size: 7vh;
}

#temperature-controller {
  border-color: rgb(216, 212, 212);
  border-style: solid;
  border-radius: 10px;
  border-width: 1px;
  height: 100%;
  overflow: hidden;
}
</style>
