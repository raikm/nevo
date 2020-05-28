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
      <div v-if="temperatureInfo != 92.9">
        <span id="temperature-value"
          >+{{ temperatureInfo }}°C</span
        >
      </div>
      <div v-else>
        <span id="temperature-value" style="padding-left: 3vh">--</span>
      </div>
    </div>
    <div id="temperature-controller"></div>
  </div>
</template>

<script>
var serverAddress = "http://192.168.0.22:8181";


export default {
  name: "TemperatureMainInfoBox",
  components: {},
  props: ['serverAddress', 'temp'],
  data() {return {
      temperatureInfo:  99.9,
  }},
  created() {
        // Return the axios promise so we can daisy chain .then() in our previous call
        this.$axios
          .get(serverAddress + "/HomeAPI/rest/plants/allLastData")
          .then(function(response) {
            // handle success
            var temperatureData = response.data.map(el => el.temperature).map(Number);
            const sum = temperatureData.reduce((a, b) => a + b, 0);
            const avg = (sum / temperatureData.length) || 0;
            this.temperatureInfo = avg.toFixed(1)
          
          })
          .catch(function(error) {
            // handle error
            console.log(error);
          })
          .then(function() {
            // always executed
          });
          
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
