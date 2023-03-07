<template>
  <div v-if="measurements" class="box plant-card-wrapper">
    <div class="plant-card-header">
      <div class="plant-card-name">{{ name }}</div>
      <div v-if="!measurementsOld" class="plant-card-battery"></div>
      <div v-if="measurementsOld" class="plant-card-status">⏺</div>
    </div>
    <div class="plant-card-parameter">
      <div class="plant-card-parameter-humidity">
        <h6>Moisture</h6>
        <PlantCardProgressBar
          barColor="#007bffcc"
          :valueMinBorder="50"
          :valueMaxBorder="300"
          :value="measurements.soilMoisture"
        ></PlantCardProgressBar>
      </div>
      <div class="plant-card-parameter-fertility">
        <h6>Fertility</h6>
        <PlantCardProgressBar
          barColor="#4a7277"
          :valueMinBorder="50"
          :valueMaxBorder="300"
          :value="measurements.soilFertility"
        ></PlantCardProgressBar>
      </div>
      <div class="plant-card-parameter-sun">
        <h6>Sunlight</h6>
        <PlantCardProgressBar
          barColor="#ffe17d"
          :valueMinBorder="50"
          :valueMaxBorder="300"
          :value="measurements.sunlight"
        ></PlantCardProgressBar>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Measurement, MeasurementBorders } from '@nevo/domain-types'
import PlantCardProgressBar from './PlantCardProgressBar.vue'

const name = ref('Strelizia')
const measurements = ref<Measurement>()

const measurementFertilityBorders = ref<MeasurementBorders>()
const measurementMoistureBorders = ref<MeasurementBorders>()
const measurementSunlightBorders = ref<MeasurementBorders>()

measurements.value = {
  plantId: '1',
  battery: 100,
  soilFertility: 300,
  soilMoisture: 200,
  sunlight: 80,
  temperature: 19,
  time: new Date()
}

// TODO correct validation
const measurementsOld = ref(false)
// const measurementsOld = ref(measurements.value.time >= new Date().setDate(-1) ? true : false)
</script>

<style lang="scss">
@import '@nevo/style/variables.scss';

.plant-card-wrapper {
  width: $box-width / 2;
  height: 8rem;
  background-color: $white;
  border-radius: $standard-border-radius;
  display: flex;
  flex-direction: column;
  padding: 8px;
}

.plant-card-header {
  height: 2rem;
  display: grid;
  grid-template-columns: 85% auto;
}

.plant-card-name {
  font-size: large;
  font-weight: bold;
}

.plant-card-battery {
  width: 1.3rem;
  height: 0.5rem;
  background-color: rgb(32, 190, 32);
  border-radius: 0.2rem;
}

.plant-card-status {
  justify-self: right;
  color: $red;
}

.plant-card-parameter {
  border-radius: $standard-border-radius / 2;
  height: 8rem;
}
</style>
