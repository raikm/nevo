<template>
  <div
    class="basic-card main-info-box main-info-box-small temperature-main-info-box"
  >
    <div class="main-info-header">
      <h1 class="main-info-title" id="temperature-header">
        Indoor temperature
      </h1>
    </div>
    <div class="main-box-body">
      <div
        class="temperature-humidity-value-wrapper"
        :temperatureInfo="temperatureInfo"
        ref="temphumd"
      >
        <span
          id="temp-info"
          v-if="temperatureInfo.length !== 0 && temperatureInfo != 'NaN'"
          >{{ temperatureInfo }}°C</span
        >
        <span id="temp-info" v-else>--</span>
        <span
          id="humidity-info"
          v-if="humidityInfo.length !== 0 && humidityInfo != 'NaN'"
          >{{ humidityInfo }}%</span
        >
        <span id="humidity-info" v-else>--</span>
      </div>

      <!-- <div class="temperature-controller-container">
        <button
          id="temperature-up-button"
          class="temperature-change-button click-element"
        >
          ❯
        </button>
        <button
          id="temperature-down-button"
          class="temperature-change-button click-element"
        >
          ❯
        </button>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import "@/compiled-icons/temperature";
import "@/compiled-icons/humidity";
import { mapState } from "vuex";

import { defineComponent } from 'vue'

export default defineComponent( {
  created() {
    this.setCurrentTemperature();
    this.setCurrentHumidity();
  },
  computed: {
    ...mapState(["currentEntities"]),
  },
  watch: {
    currentEntities() {
      this.setCurrentTemperature();
      this.setCurrentHumidity();
    },
  },
  methods: {
    setCurrentTemperature() : void {
      this.currentEntities.filter((entity: any) => {
        if (entity.entity_id.startsWith("sensor.temperature")) {
          this.temperatureInfo = Number(entity.state).toFixed(1);
        }
      });
    },
    setCurrentHumidity() : void {
      this.currentEntities.filter((entity: any) => {
        if (entity.entity_id.startsWith("sensor.humidity")) {
          this.humidityInfo = Number(entity.state).toFixed(1);
        }
      });
    },
  },
  data() {
    return {
      temperatureInfo: "",
      humidityInfo: "",
    };
  },
});
</script>

<style lang="scss">
.temperature-humidity-wrapper {
  display: grid;
}

.temperature-humidity-value-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 4fr 1fr;
  height: 100%;

  #temp-info {
    font-size: 5vh;
  }
  #humidity-info {
    font-size: 2vh;
  }
}

// .temperature-controller-container {
//   align-self: stretch;
//   display: grid;
//   width: 100%;
//   padding: 10%;
//   grid-auto-rows: 3.8vh;
//   grid-row-gap: 0;
//   justify-content: right;
// }
//
// .temperature-change-button {
//   height: 3.8vh;
//   width: 3.8vh;
//   border: 0px solid #000000;
//   background-color: rgba(235, 234, 234, 0.611);
//   font-size: x-large;
//   color: rgba(201, 201, 201, 1);
// }

// #temperature-up-button {
//   border-radius: 0 10px 10px 0;
//   transform: rotate(-90deg);
// }
// #temperature-down-button {
//   border-radius: 0 10px 10px 0;
//   transform: rotate(90deg);
// }
</style>
