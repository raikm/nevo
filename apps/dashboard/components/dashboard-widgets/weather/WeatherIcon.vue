<template>
  <component
    v-if="weather.main === 'Clear' && store.state.sunset === false"
    :is="Clear"
  ></component>
  <component v-if="weather.main === 'Clear' && store.state.sunset === true" :is="Moon"></component>
  <!-- <component v-if="weather.main === 'Clouds'" :is="Clouds"></component>
  <component v-if="weather.main === 'Rain'" :is="Rain"></component>
  <component v-if="weather.main === 'Thunderstorm'" :is="Thunderstorm"></component>
  <component v-if="weather.main === 'Drizzle'" :is="Drizzle"></component>
  <component v-if="weather.main === 'Snow'" :is="Snow"></component> -->
</template>

<script lang="ts" setup>
import { useStore } from '~~/store'
// TODO alias for icons
import Clear from 'icons/weather/weather_clear.svg'
// import Drizzle from '../../../assets/icons/weather/weather_mist.svg'
// import Moon from '../../../assets/icons/weather/weather_moon.svg'
// import Rain from '../../../assets/icons/weather/weather_rain.svg'
// import Snow from '../../../assets/icons/weather/weather_snow.svg'
// import Thunderstorm from '../../../assets/icons/weather/weather_thunderstorm.svg'
import { Weather } from '../../../types/weatherForecast'
const store = useStore()
defineProps<{ weather: Weather }>()
</script>
