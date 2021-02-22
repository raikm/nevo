<template>
  <div class="basic-card main-info-box-small e-bike-info-wrapper">
    <div class="e-bike-info-box">
      <div id="chart-wrapper">
        <canvas id="bike-battery-chart"></canvas>
      </div>
      <div id="kilometer-wrapper">
        <span id="kilometer-info">{{ bikeData.estimatedRange }} km</span>
      </div>
    </div>
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
    const ctx = document.getElementById("bike-battery-chart");
    console.log(ctx);
    /* eslint-disable no-unused-vars */
    var donutChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [72, 28],
            backgroundColor: ["#0CF574", "#fff"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 70,
        elements: {
          arc: {
            borderWidth: 0,
          },
        },
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

.e-bike-info-wrapper {
  position: relative;
  background: url(../../../public/img/ebike.png) no-repeat 50% -20%;
  background-color: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(10px);
  background-size: cover;
}

.e-bike-info-box {
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
}

#chart-wrapper {
  min-width: 0;
  overflow: auto;
  width: 75%;
  height: 75%;
}

#kilometer-wrapper {
  text-align: right;
  align-self: center;
}

#kilometer-info {
  border-radius: $standard-border-radius;
  border: 1px solid #000000;
  padding: 5px;
}
</style>
