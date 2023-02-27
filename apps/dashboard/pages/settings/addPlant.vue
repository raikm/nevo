<script lang="ts" setup>
import { Location, MiFloraDevice, PlantCreationParameters } from '@nevo/domain-types'
import { usePlantService } from '~~/services/plant'

const router = useRouter()
const plantService = usePlantService()

const sensors = ref<MiFloraDevice[]>()
const locations = ref<Location[]>()
const requestingSensors = ref(false)
const selectedLocation = ref<Location>()

onMounted(async () => {
  await getNearbySensors()
  locations.value = await plantService.getAllLocations()
})

const getNearbySensors = async () => {
  requestingSensors.value = true
  sensors.value = await plantService.discover()
  requestingSensors.value = false
}

const plantCreationParameters = ref<PlantCreationParameters>({ name: '', address: '', version: '' })
const selectSensor = (device: MiFloraDevice) => {
  plantCreationParameters.value.address = device.address
  plantCreationParameters.value.version = '0.0.0'
}

watch(selectedLocation, (currentValue) => {
  plantCreationParameters.value.location = currentValue
})

const save = async () => {
  plantService.create(plantCreationParameters.value)
  router.back()
}
</script>

<template>
  <div>
    <div class="plant-list-header">
      <button class="hover-button refresh-button" @click="getNearbySensors">
        <div class="svg-icon-container" :class="{ rotating: requestingSensors }">
          <svg
            fill="#000000"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="800px"
            height="800px"
            viewBox="0 0 568.017 568.017"
            xml:space="preserve"
          >
            <g>
              <g>
                <path
                  d="M72.553,400.503c11.12,11.119,29.156,11.119,40.282,0l71.849-83.238c11.12-11.119,7.387-20.141-8.342-20.141h-46.444
			c-3.929-52.24,14.688-104.059,52.999-142.37c71.194-71.188,187.022-71.188,258.209,0c34.486,34.486,53.477,80.331,53.477,129.102
			c0,48.77-18.996,94.616-53.477,129.102c-49.395,49.395-121.219,66.23-187.511,43.936c-19.205-6.488-40.043,3.867-46.512,23.09
			c-6.469,19.223,3.868,40.043,23.09,46.512c27.124,9.131,54.903,13.574,82.388,13.574c66.623,0,131.439-26.156,180.461-75.184
			c48.36-48.355,74.994-112.645,74.994-181.036c0-68.392-26.634-132.676-74.994-181.036c-99.823-99.823-262.243-99.823-362.06,0
			c-52.424,52.424-78.636,122.871-74.75,194.304H14.744c-15.728,0-19.461,9.014-8.341,20.141L72.553,400.503z"
                />
              </g>
            </g>
          </svg>
        </div>
      </button>
    </div>
    <div class="plants-sensor-list-container">
      <div v-if="requestingSensors" class="plant-sensor-searching-placehnolder">
        Searching for nearby Sensors ...
      </div>
      <div
        v-if="!requestingSensors && sensors?.length == 0"
        class="plant-sensor-searching-placehnolder"
      >
        No Sensors found
      </div>
      <div
        class="plant-sensor-row"
        :class="{ 'selected-sensor': sensor.address === plantCreationParameters.address }"
        @click="selectSensor(sensor)"
        v-for="sensor in sensors"
      >
        <div class="plant-sensor-row-left">
          <div class="plant-sensor-row-name">{{ sensor.name ?? 'Undefined' }}</div>
          <div class="plant-sensor-row-room">{{ sensor.address }}</div>
        </div>
      </div>
    </div>

    <div v-if="plantCreationParameters.address.length > 0" class="add-new-plant-sensor-form">
      <input v-model="plantCreationParameters.name" type="text" />
      <!-- location selector -->
      <select v-model="selectedLocation">
        <option v-for="location in locations" :value="location">{{ location.name }}</option>
      </select>

      <button @click="save">Save</button>
    </div>
  </div>
</template>

<style lang="scss">
.plant-list-header {
  display: grid;
  justify-items: right;
  height: 100%;
  margin-bottom: 1rem;
}

.loader {
  width: 1rem;
  height: 1rem;
  border: 2px solid #000000;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
  to {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
}
.rotating {
  -webkit-animation: rotating 1s linear infinite;
  -moz-animation: rotating 1s linear infinite;
  -ms-animation: rotating 1s linear infinite;
  -o-animation: rotating 1s linear infinite;
  animation: rotating 1s linear infinite;
}

.plant-sensor-searching-placehnolder {
  display: grid;
  align-items: center;
}

.selected-sensor {
  color: blue;
}

.add-new-plant-sensor-form {
  margin: 1rem 0;
  display: grid;
  grid-template-columns: auto 20% 10%;
  gap: 1rem;
}
</style>
