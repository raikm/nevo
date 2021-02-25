<template>
  <div
    class="basic-card main-info-box main-info-box-small temperature-main-info-box"
  >
    <div class="main-info-header">
      <h1 class="main-info-title" id="temperature-header">
        Indoor temperature
      </h1>
    </div>

    <div class="temperature-humidity-wrapper">
      <div
        class="temperature-humidity-value-wrapper"
        :temperatureInfo="temperatureInfo"
      >
        <span v-if="temperatureInfo != '99.9'" class="temperature-value"
          >{{ temperatureInfo }}°C</span
        >
        <span v-else class="temperature-value" style="padding-left: 3vh"
          >--</span
        >
        <span v-if="humidityInfo != 999.9" class="humidity-value"
          >{{ humidityInfo }}%</span
        >
        <span v-else class="humidity-value" style="padding-left: 3vh">--</span>
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

<script>
import "@/compiled-icons/temperature";
import "@/compiled-icons/humidity";

export default {
  mounted() {
    this.getCurrentTemperature();
    this.getCurrentHumidity();
  },
  methods: {
    getCurrentTemperature() {
      this.$store.getters.getCurrentEntities.filter((entity) => {
        if (entity.entity_id.startsWith("sensor.temperature")) {
          this.temperatureInfo = parseFloat(entity.state).toFixed(1);
        }
      });
    },
    getCurrentHumidity() {
      this.$store.getters.getCurrentEntities.filter((entity) => {
        if (entity.entity_id.startsWith("sensor.humidity")) {
          console.log(entity);
          this.humidityInfo = parseFloat(entity.state).toFixed(1);
        }
      });
    },
  },
  data() {
    return {
      temperatureInfo: 99.9,
      humidityInfo: 999.9,
    };
  },
};
</script>

<style lang="scss">
.temperature-humidity-wrapper {
  display: grid;
  grid-template-columns: 7fr 3fr;
}

.temperature-humidity-value-wrapper {
  display: grid;
  grid-template-columns: 1fr;
}

.temperature-value {
  font-size: $standard-text-medium;
}

.humidity-value {
  font-size: $standard-text-small;
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

.temperature-change-button {
  height: 3.8vh;
  width: 3.8vh;
  border: 0px solid #000000;
  background-color: rgba(235, 234, 234, 0.611);
  font-size: x-large;
  color: rgba(201, 201, 201, 1);
}

#temperature-up-button {
  border-radius: 0 10px 10px 0;
  transform: rotate(-90deg);
}
#temperature-down-button {
  border-radius: 0 10px 10px 0;
  transform: rotate(90deg);
}
</style>
