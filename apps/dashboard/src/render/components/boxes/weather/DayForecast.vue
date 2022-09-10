<template>
  <div v-if="currentWeather">
    <div class="main-info-title" id="weather-header">
      <div id="weather-city-name">Berlin</div>


      <div class="current-weather-icon-wrapper">
        <!-- TODO extra component -->
        <component v-if="currentWeather.weather[0].main ==='Clear'" :is="Clear"></component>
        <component v-if="currentWeather.weather[0].main ==='Clouds'" :is="Clouds"></component>
        <component v-if="currentWeather.weather[0].main ==='Rain'" :is="Rain"></component>
        <component v-if="currentWeather.weather[0].main ==='Thunderstorm'" :is="Thunderstorm"></component>
        <component v-if="currentWeather.weather[0].main ==='Drizzle'" :is="Drizzle"></component>
        <component v-if="currentWeather.weather[0].main ==='Snow'" :is="Snow"></component>
      </div>
    </div>
    <div id="temperature-info-overview" v-if="todayForecast">
      <span id="temperature-outdoor-info">{{ Math.round(currentWeather.temp) }}°</span>
      <div id="weather-description">
        <span>{{ currentWeather.weather[0].main }}</span>
        <span>
          H: {{ Math.round(todayForecast.temp.max) }}° L:
          {{ Math.round(todayForecast.temp.min) }}°
        </span>
      </div>
    </div>
    <div id="temperature-hour-info">
      <div
        class="temperature-hour-content"
        :key="index"
        v-for="(tempHourInfo, index) in tempHourInfos"
      >
        <div class="weather-hour">
          {{
            new Date(
              currentHour.setHours(currentHour.getHours() + 1)
            ).getHours()
          }}
        </div>
        <div class="weather-icon-wrapper">
          <component v-if="currentWeather.weather[0].main ==='Clear'" :is="Clear"></component>
          <component v-if="currentWeather.weather[0].main ==='Clouds'" :is="Clouds"></component>
          <component v-if="currentWeather.weather[0].main ==='Rain'" :is="Rain"></component>
          <component v-if="currentWeather.weather[0].main ==='Thunderstorm'" :is="Thunderstorm"></component>
          <component v-if="currentWeather.weather[0].main ==='Drizzle'" :is="Drizzle"></component>
          <component v-if="currentWeather.weather[0].main ==='Snow'" :is="Snow"></component>
        </div>
        <div class="weather-hour-temperature">{{ Math.round(tempHourInfo.temp) }}°</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { onMounted, ref } from "vue";
import colors from "../../../../../../../libs/style/variables.scss";
import Clear from "../../../assets/icons/weather/weather_clear.svg";
import Clouds from "../../../assets/icons/weather/weather_clouds.svg";
import Drizzle from "../../../assets/icons/weather/weather_mist.svg";
import Rain from "../../../assets/icons/weather/weather_rain.svg";
import Snow from "../../../assets/icons/weather/weather_snow.svg";
import Thunderstorm from "../../../assets/icons/weather/weather_thunderstorm.svg";
import { CurrentWeather, Daily, Description, Weatherforecast } from "../../../types/weatherforecast.interface";

const { weatherForecast } = defineProps<{ weatherForecast: Weatherforecast }>()
const  currentWeather = ref<CurrentWeather>()
const tempHourInfos = ref<CurrentWeather[]>()
const todayForecast = ref<Daily>();
const currentHour = ref(new Date());

onMounted(() => {
  setup6HoursForecast();
})

const setup6HoursForecast = () => {
  currentWeather.value = weatherForecast.current;
  todayForecast.value = weatherForecast.daily[0];
  let _weatherHour = Object.values(weatherForecast.hourly);

  tempHourInfos.value = _weatherHour.slice(0, 6).filter((hour) => {
    return hour;
  });
}
const currentWeatherIconColor = (weatherDescription: Description) => {
  switch (weatherDescription) {
    case Description.ClearSky:
      return colors.mainYellow;
    default:
      return colors.mainLightGray;
  }
}
</script>

<style lang="scss">
.current-weather-icon-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.current-weather-icon-wrapper {
  display: grid;
  justify-content: right;
}
.current-weather-icon-wrapper > svg {
  margin: 5% 0;
  width: 90%;
  height: 90%;
  fill: lightgray;
}
.weather-icon-wrapper {
  justify-self: center;
  display: grid;
  justify-content: center;
  justify-items: center;
}

.weather-icon-wrapper > svg {
  margin: 10% 0;
  width: 80%;
  height: 80%;
  fill: lightgray;
}
</style>
