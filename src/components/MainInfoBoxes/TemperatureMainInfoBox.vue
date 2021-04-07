<template>
  <div
    ref="tempbox"
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
          v-if="temperatureInfo != '99.9' && temperatureInfo != 'NaN'"
          :style="{ fontSize: this.$refs.temphumd.clientHeight * 0.5 + 'px' }"
          >{{ temperatureInfo }}°C</span
        >
        <span v-else :style="{ fontSize: '3vh' }">--</span>

        <span
          v-if="humidityInfo != 999.9 && humidityInfo != 'NaN'"
          :style="{ fontSize: this.$refs.temphumd.clientHeight * 0.2 + 'px' }"
          >{{ humidityInfo }}%</span
        >
        <span v-else>--</span>
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
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["currentEntities"]),
  },
  watch: {
    currentEntities() {
      this.getCurrentTemperature();
      this.getCurrentHumidity();
    },
  },
  methods: {
    getCurrentTemperature() {
      // console.log("getCurrentTemperature");

      this.$store.getters.currentEntities.filter((entity) => {
        if (entity.entity_id.startsWith("sensor.temperature")) {
          // console.log(entity.state);
          this.temperatureInfo = parseFloat(entity.state).toFixed(1);
        }
      });
    },
    getCurrentHumidity() {
      this.$store.getters.currentEntities.filter((entity) => {
        if (entity.entity_id.startsWith("sensor.humidity")) {
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
.temperature-main-info-box {
}

.temperature-humidity-wrapper {
  display: grid;
}

.temperature-humidity-value-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 4fr 1fr;

  height: 100%;
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
