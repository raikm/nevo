<template>
  <div class="basic-card main-info-box e-bike-info-box">
    <div id="battery-status-container">
      <canvas id="donutChart" data-percent="85"></canvas>
    </div>
    <div id="kilometer-info">{{ bikeData.estimatedRange }} km</div>
    <img id="img-e-bike" src="../../../public/img/ebike.png" />
  </div>
</template>

<script>
// var serverAddress = "http://192.168.0.22:8181";

import Chart from "chart.js";
export default {
  name: "EBikeMainInfoBox",
  components: {},
  props: [],
  data() {
    return {
      bikeData: {
        batteryStatus: 80,
        estimatedRange: 40.5,
      },
    };
  },
  mounted() {
    const ctx = document.getElementById("donutChart");
    console.log(ctx);
    /* eslint-disable no-unused-vars */
    var donutChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [46],
            backgroundColor: "#0CF574",
          },
        ],
      },
      options: {
        responsive: true,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
    });
  },
};
</script>

<style lang="scss">
@import "../../style/main-style";

.e-bike-info-box {
  display: inline-block;
  // height: 5vw;
  // margin: 0 1.6%;
  width: 30%;
  overflow: hidden;

  #kilometer-info {
    float: right;
    border-radius: $standard-border-radius;
    border: 1px solid #000000;
    
     
  }
  #battery-status-container {
    width: 8%;
    position: absolute;
    // z-index: 99;
    // left: 0;

    #img-e-bike {
      position: absolute;
      // width: 70%;
      // height: 160%;

      margin-left: 30%;
      opacity: 0.5;
      z-index: 99;
      //  filter: drop-shadow(2px 2px 2px #222);
    }
  }
}
</style>
