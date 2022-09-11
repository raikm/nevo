<template>
  <DayForecast
    :style="{ backgroundImage: backgroundImage }"
    v-if="weatherForecast && Object.keys(weatherForecast).length !== 0"
    class="forecast"
    :weatherForecast="weatherForecast"
  />
</template>

<script lang="ts" setup>
import axios from 'axios'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { Config } from '../../../types/config.interface'
import { Weatherforecast } from '../../../types/weatherforecast.interface'
import DayForecast from './DayForecast.vue'

const store = useStore()
let refreshInterval: NodeJS.Timer

onMounted(async () => {
  await weatherForecastDataFromAPI()
  refreshInterval = setInterval(async () => {
    await weatherForecastDataFromAPI()
  }, 100000)
})

onBeforeUnmount(() => {
  clearInterval(refreshInterval)
})

const weatherForecast = ref<Weatherforecast>()
const backgroundImage = ref(
  'linear-gradient(-150deg, #7de2fc 0%, #b6bee5 100%)'
)

const weatherForecastDataFromAPI = async () => {
  const config = store.state.config as Config
  const { api_key, open_weather_url } = config.weather

  const response = await axios.get(`${open_weather_url}&appid=${api_key}`, {})
  weatherForecast.value = response.data

  defineBackground()
}
const defineBackground = () => {
  if (weatherForecast.value == null) return
  const sunset = new Date(weatherForecast.value.daily[0].sunset)
  const sunsetInMinutes = sunset.getHours() * 60 + sunset.getMinutes()
  const now = new Date()
  const nowInMinutes = now.getHours() * 60 + now.getMinutes()
  //DAY
  if (sunsetInMinutes > nowInMinutes) {
    store.state.sunset = false
    switch (weatherForecast.value.current.weather[0].main) {
      case 'Snow':
        backgroundImage.value =
          'linear-gradient(-150deg, #045d73 0%, #676b82 100%)'
        break
      case 'Rain':
        backgroundImage.value =
          'linear-gradient(-150deg, #045d73 0%, #676b82 100%)'
        break
      default:
        backgroundImage.value =
          'linear-gradient(-150deg, #5ea5c9 100%, #2374bb 0%)'
        break
    }
  }
  //NIGHT
  else {
    store.state.sunset = true
    backgroundImage.value = 'linear-gradient(-150deg, #045d73 0%, #676b82 100%)'
  }
}
</script>

<style lang="scss">
@import '../../../../../../../libs/style/variables.scss';

.forecast {
  height: 100%;
}

#weather-header {
  // background-color: chartreuse;
  height: 20%;
  display: grid;
  color: white;
  grid-template-columns: 4fr 1fr;
  #weather-icon {
    height: 100%;
    justify-self: right;
  }
}

#temperature-info-overview {
  // background-color: red;
  height: 40%;
  display: grid;
  color: white;
  grid-template-columns: 2fr 4fr;
  #temperature-outdoor-info {
    font-size: $standard-text-big;
  }
  #weather-description {
    text-align: right;
    font-size: $standard-text-small;
    display: grid;
    grid-template-rows: 0.5fr 1fr;
  }
}

#temperature-hour-info {
  // background-color: blue;
  height: 40%;
  display: grid;
  color: white;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 15px;
  .temperature-hour-content {
    // text-align: center;
    display: grid;
    grid-template-rows: 13px 25px 13px;

    // justify-items: center;
    align-items: center;

    .weather-hour {
      font-size: $standard-text-small;
      opacity: 80%;
      justify-self: center;
    }
    .weather-icon-wrapper {
      width: 100%;
      height: 100%;
    }

    .weather-hour-icon {
      fill: white;
    }

    .weather-hour-temperature {
      font-size: $standard-text-small;
      font-weight: 700;
      justify-self: center;
    }
  }
}
</style>
