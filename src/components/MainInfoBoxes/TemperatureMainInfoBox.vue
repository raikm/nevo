<template>
  <div
    class="basic-card main-info-box main-info-box-small temperature-main-info-box"
  >
    <div class="main-info-header">
      <h1 class="main-info-title" id="temperature-header">
        Indoor temperature
      </h1>
      <div class="main-info-icon-container">
        <svgicon icon="temperature"></svgicon>
      </div>
    </div>

    <div class="temperature-humidity-wrapper">
      <div
        class="temperature-humidity-value-wrapper"
        :temperatureInfo="temperatureInfo"
      >
        <!-- normally here sho duld be 99.9 but cause of debug and server not avaible -->
        <span v-if="temperatureInfo == 23.9" class="temperature-value"
          >+{{ temperatureInfo }}°C</span
        >

        <span v-else class="temperature-value" style="padding-left: 3vh"
          >--</span
        >

        <span v-if="humidityInfo == 60.9" class="humidity-value"
          >{{ humidityInfo }}%</span
        >
        <span v-else class="humidity-value" style="padding-left: 3vh">--</span>
      </div>
      <div class="temperature-controller-container">
        <button id="temperature-up-button" class="temperature-change-button click-element">❯</button>
        <button id="temperature-down-button" class="temperature-change-button click-element">❯</button>
      </div>
    </div>
  </div>
</template>

<script>
// var serverAddress = "http://192.168.0.22:8181";
import "../../compiled-icons/temperature";
import "../../compiled-icons/humidity";
// import VerticalBarController from "../InteractionController/VerticalBarController";

export default {
  name: "TemperatureMainInfoBox",
  // components: {VerticalBarController}, 
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

.temperature-humidity-wrapper {
  display: grid;
  grid-template-columns: 7fr 3fr;
}

.temperature-humidity-value-wrapper{
  display: grid;
  grid-template-columns: 1fr;
}

.temperature-value {
  font-size: 4.5vh;
}

#temperature-control {
  height: 3vh;
  width: 100%;

  position: relative;
  bottom: -35%;
  left: 30%;
}

#temperature-control::-webkit-slider-thumb {
  -webkit-appearance: none;
  -webkit-touch-appearance: none;
  width: 0px; /* 1 */
  background: #fff;
  box-shadow: -100vw 0 0 100vw #dc2e02e3;
}

.humidity-value {
  font-size: 2.2vh;
  // margin-left: 2%;
}

.temperature-controller-container {
  align-self: stretch;
  display: grid;
  width: 100%;
  padding: 10%;
  grid-auto-rows: 3.8vh;
  grid-row-gap: 0;
  justify-content: right;
  
   
}

.temperature-change-button{
  height: 3.8vh;
  width: 3.8vh;
  border: 0px solid #000000;
  background-color: rgba(235, 234, 234, 0.611);
  font-size: x-large;
  color: rgba(201, 201, 201, 1);

}
#temperature-up-button{
  border-radius: 0 10px 10px 0;
  transform: rotate(-90deg);
  
}
#temperature-down-button{
  border-radius: 0 10px 10px 0;
  transform: rotate(90deg);
 
}
</style>
