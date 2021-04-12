<template>
  <div
    id="weather-box"
    class="basic-card main-info-box main-info-box-small"
    :style="{ backgroundImage: this.backgroundImage }"
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
    this.defineBackground();
  },
  methods: {
    currentWeatherIconColor(weatherDescription) {
      //TODO: define colors in SVGs/js
      switch (weatherDescription) {
        case "Clear":
          return colors.mainYellow;
        default:
          return colors.mainLightGray;
      }
    },
    defineBackground() {
      let sunset = new Date(this.todayForecast.sunset);
      let sunsetInMinutes = sunset.getHours() * 60 + sunset.getMinutes();
      let now = new Date();
      let nowInMinutes = now.getHours() * 60 + now.getMinutes();
      if (sunsetInMinutes < nowInMinutes) {
        this.backgroundImage =
          "linear-gradient(-150deg, #045d73 0%, #676b82 100%)";
      } else {
        this.backgroundImage =
          "linear-gradient(-150deg, #7de2fc 0%, #b6bee5 100%)";
      }
    },
  },
  data() {
    return {
      tempHourInfos: [],
      currentWeather: {},
      todayForecast: {},
      currentHour: new Date(),
      backgroundImage: "linear-gradient(-150deg, #7de2fc 0%, #b6bee5 100%)",
    };
  },
};
</script>

<style></style>
