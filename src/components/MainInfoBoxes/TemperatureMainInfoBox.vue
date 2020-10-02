<template>
  <div
    class="basic-card main-info-box main-info-box-small temperature-main-info-box"
  >
    <div class="main-info-header">
      <div class="main-info-icon-container">
        <svgicon icon="temperature"></svgicon>
      </div>

      <h1 class="main-info-title" id="temperature-header">
        Indoor temperature
      </h1>
    </div>

    <div class="temperature-value-container" :temperatureInfo="temperatureInfo">
      <div v-if="temperatureInfo == 23.9">
        <!-- normally here should be 99.9 but cause of debug and server not avaible -->
        <span class="temperature-value">+{{ temperatureInfo }}°C</span>
      </div>
      <div v-else>
        <span class="temperature-value" style="padding-left: 3vh">--</span>
      </div>
    </div>

    <div class="temperature-controller-container">
      <VerticalBarController id="temperature-control" />
    </div>

    <!-- <div class="humidity-value-container">
      <svgicon class="small-icon" icon="humidity"></svgicon>
      <span v-if="humidityInfo == 60.9" class="humidity-value"
        >{{ humidityInfo }}%</span
      >
      <span v-else class="humidity-value" style="padding-left: 3vh">--</span>
    </div> -->
  </div>
</template>

<script>
// var serverAddress = "http://192.168.0.22:8181";
import "../../compiled-icons/temperature";
import "../../compiled-icons/humidity";
import VerticalBarController from "../InteractionController/VerticalBarController";

export default {
  name: "TemperatureMainInfoBox",
  components: { VerticalBarController },
  props: ["serverAddress", "temp"],
  data() {
    return {
      temperatureInfo: 23.9,
      humidityInfo: 60.9,
    };
  },
  mounted() {
    // Return the axios promise so we can daisy chain .then() in our previous call
    // this.$axios
    //   .get(serverAddress + "/HomeAPI/rest/plants/allLastData")
    //   .then((response) => {
    //     // handle success
    //     var temperatureData = response.data.map(el => el.temperature).map(Number);
    //     const sum = temperatureData.reduce((a, b) => a + b, 0);
    //     const avg = (sum / temperatureData.length) || 0;
    //     this.temperatureInfo = avg.toFixed(1)
    //   })
    //   .catch(function(error) {
    //     // handle error
    //     console.log(error);
    //   })
    //   .then(function() {
    //     // always executed
    //   });
  },
};
</script>

<style lang="scss">
.temperature-main-info-box {
}

.temperature-value-container {
  float: left;
  width: 70%;
  height: 40%;
  .temperature-value {
    font-size: 4.5vh;
  }
}

.temperature-controller-container {
  float: left;
  width: 30%;
  height: 70%;
  position: relative;

  #temperature-control {
    height: 3vh;
    width: 100%;

    position: absolute;
    bottom: 45%;
    left: 30%;
  }

  #temperature-control::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-touch-appearance: none;
    width: 0px; /* 1 */
    background: #fff;
    box-shadow: -100vw 0 0 100vw #ffac88;
  }
}

.humidity-value-container {
  margin-left: 2%;
  float: left;
  width: 30%;
  height: 30%;

  .humidity-value {
    font-size: 2.2vh;
    margin-left: 2%;
  }
}
</style>
