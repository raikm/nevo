<template>
  <div
    id="weather-box"
    class="basic-card main-info-box main-info-box-small"
  >
    <div id="weather-header">
      <div id="weather-city-name">Salzburg</div>
      <svgicon
        id="weather-icon"
        :icon="'Weather_' + currentWeather.weather[0].main"
        :style="{
          fill: currentWeatherIconColor(currentWeather.weather[0].main),
        }"
      ></svgicon>
    </div>
    <div id="temperature-info-overview">
      <span id="temperature-outdoor-info"
        >{{ Math.round(currentWeather.temp) }}°</span
      >
      <div id="weather-description">
        <span>{{ currentWeather.weather[0].main }}</span>
        <span
          >H: {{ Math.round(todayForecast.temp.max) }}° L:
          {{ Math.round(todayForecast.temp.min) }}°
        </span>
      </div>
    </div>
    <div id="temperature-hour-info">
      <div
        class="temperature-hour-content"
        :key="tempHourInfo.index"
        v-for="tempHourInfo in tempHourInfos"
      >
        <div class="weather-hour">
          {{
            new Date(
              currentHour.setHours(currentHour.getHours() + 1)
            ).getHours()
          }}
        </div>
        <div class="weather-icon-wrapper">
          <svgicon
            class="weather-hour-icon"
            width="1.5vh"
            :icon="'Weather_' + currentWeather.weather[0].main"
            :style="{
              fill: currentWeatherIconColor(currentWeather.weather[0].main),
            }"
          ></svgicon>
        </div>
        <div class="weather-hour-temperature">
          {{ Math.round(tempHourInfo.temp) }}°
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import colors from "@/style/main-colors.scss";

export default {
  computed: mapState(["weather"]),
  props: ["weatherForecast"],
  created() {
    this.currentWeather = this.weatherForecast.current;
    this.todayForecast = this.weatherForecast.daily[0];
    let _weatherHour = Object.values(this.weatherForecast.hourly);

    this.tempHourInfos = _weatherHour.slice(0, 6).filter((hour) => {
      return hour;
    });
  },
  methods: {
    currentWeatherIconColor(weatherDescription) {
      switch (weatherDescription) {
        case "Clear":
          return colors.mainYellow;
        default:
          return colors.mainLightGray;
      }
    },
  },
  data() {
    return {
      tempHourInfos: [],
      currentWeather: {},
      todayForecast: {},
      currentHour: new Date(),
    };
  },
};
</script>

<style></style>
