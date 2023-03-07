<script lang="ts" setup>
import { Location, MeasurementRange, PlantUpdateParameters } from '@nevo/domain-types'
import { nvButton, nvInput, nvSelect } from '@nevo/ui'
import { usePlantService } from '~~/services/plant'
const router = useRouter()
const route = useRoute()
const plantService = usePlantService()

const plantUpdateParameters = ref<PlantUpdateParameters>({ name: '' })

// TODO move to domain-types
enum MeasurementType {
  BATTERY = 'BATTERY',
  SOILFERTILITY = 'SOILFERTILITY',
  SOILMOISTURE = 'SOILMOISTURE',
  TEMPERATURE = 'TEMPERATURE',
  SUNLIGHT = 'SUNLIGHT'
}

enum MeasurementUnit {
  PERCENTAGE = '%',
  CONDUCTIVITY = 'µS/cm',
  CELSIUS = '°C',
  LUX = 'Lux'
}

const mostureRanges = ref<MeasurementRange>({
  type: MeasurementType.SOILMOISTURE,
  unit: MeasurementUnit.PERCENTAGE,
  min: 0,
  max: 0
})

const locations = ref<Location[]>()
const requestBlinking = ref(false)
const blinkingInProgress = ref(false)

const save = async () => {
  await plantService.update(route.params.id.toString(), plantUpdateParameters.value)
}

const blinking = async () => {
  requestBlinking.value = true

  await plantService.blinking(route.params.id.toString())

  requestBlinking.value = false
  blinkingInProgress.value = true
  setTimeout(() => {
    blinkingInProgress.value = false
  }, 5000)
}

watch(plantUpdateParameters.value, () => {
  save()
})

const remove = async () => {
  await plantService.delete(route.params.id.toString())
  router.back()
}

onMounted(async () => {
  locations.value = await plantService.getAllLocations()

  const plant = await plantService.getOne(route.params.id.toString())
  if (plant != null) {
    plantUpdateParameters.value.name = plant.name
    plantUpdateParameters.value.location = plant.location
  }
})
</script>

<template>
  <h3>Edit plant sensor</h3>
  <div class="plant-img-header-wrapper">
    <img
      class="plant-img-header"
      src="https://m.media-amazon.com/images/I/711pclXMNyL._AC_SL1500_.jpg"
      alt="W3Schools.com"
    />
  </div>
  <div v-if="plantUpdateParameters" class="settings-detail-container">
    <nv-input label="Name" v-model="plantUpdateParameters.name" />
    <!-- location selector -->
    <nv-select label="Room" v-model="plantUpdateParameters.location">
      <option v-for="location in locations" :value="location">{{ location.name }}</option>
    </nv-select>
    <div class="nv-input-headline">Moisture Borders</div>
    <nv-input label="Minimum" type="number" v-model="mostureRanges.min" />
    <nv-input label="Maximum" type="number" v-model="mostureRanges.max" />
    <div class="settings-detail-sub">
      <nv-button @click="blinking">
        <template v-if="!requestBlinking && !blinkingInProgress">Blink</template>
        <template v-else-if="requestBlinking && !blinkingInProgress"><Loading /></template>
        <template v-else-if="!requestBlinking && blinkingInProgress">blinking</template>
      </nv-button>
    </div>
    <div class="settings-detail-sub">
      <nv-button type="danger" @click="remove">Delete</nv-button>
    </div>
  </div>
</template>

<style lang="scss">
.plant-img-header-wrapper {
  height: 22rem;
  overflow: hidden;
  border-radius: 10px;
  width: 100%;
}

.plant-img-header {
  width: 100%;
  object-fit: contain;
}
</style>
