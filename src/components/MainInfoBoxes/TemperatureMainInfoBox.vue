<template>
  <div class="main-info-box main-info-box-small">
    <div id="temperature-info-box" :temperatureInfo="temperatureInfo">
      <div class="main-info-header">
        <img
          class="main-info-icon"
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
        <span id="temperature-value" style="padding-left: 3vh">--</span>
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
#temperature-info-box {
  float: left;
  margin-right: 10px;
  width: 85%;
}

#temperature-value {
  font-size: 7vh;
}

#temperature-controller {
  
  background-color: rgba(234, 48, 48, 0.274);
  
  border-radius: 10px;
  height: 100%;
  overflow: hidden;
}
</style>
