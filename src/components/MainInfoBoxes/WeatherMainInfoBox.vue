<template>
  <div
    id="weather-box"
    class="basic-card main-info-box main-info-box-small"
    :style="{ backgroundImage: this.backgroundImage }"
    v-if="currentWeather.weather"
  >
    <div id="weather-header">
      <div id="weather-city-name">Salzburg</div>
      <svgicon
        id="weather-icon"
        :icon="'Weather_' + currentWeather.weather[0].main"
        :style="{
          fill: getWeatherIconColor(currentWeather.weather[0].main),
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
          >H: {{ Math.round(todayForcast.temp.max) }}° L:
          {{ Math.round(todayForcast.temp.min) }}°
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
              fill: getWeatherIconColor(currentWeather.weather[0].main),
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
import "../../compiled-icons/Weather_Clear";
import "../../compiled-icons/Weather_Clouds_2";
import "../../compiled-icons/Weather_Clouds_Day";
import "../../compiled-icons/Weather_Clouds";
import "../../compiled-icons/Weather_Mist";
import "../../compiled-icons/Weather_Rain";
import "../../compiled-icons/Weather_Snow";
import "../../compiled-icons/Weather_Sunrise";
import "../../compiled-icons/Weather_Sunset";
import "../../compiled-icons/Weather_Thunderstorm";

import { mapState } from "vuex";
import colors from "@/style/main-colors.scss";



export default {
  name: "WeatherMainInfoBox",
  components: {},
  props: [],
  computed: mapState(["weather"]),
  created() {
    this.getWeatherDataFormAPI();
  },
  mounted() {},
  methods: {
    getWeatherDataFormAPI() {
      const {
        api_key,
        open_weather_url,
      } = this.$store.getters.getConfig.weather;

      this.$axios
        .get(`${open_weather_url}&appid=${api_key}`, {})
        .then((response) => {
          this.currentWeather = response.data.current;
          this.todayForcast = response.data.daily[0];
          this.defineBackground();
          let _weatherHour = Object.values(response.data.hourly);

          this.tempHourInfos = _weatherHour.slice(0, 6).filter((hour) => {
            return hour;
          });
        })
        .catch((error) => {
          this.showToastError(error.toString());
        });
    },
    getWeatherIconColor(weatherDescription) {
      //TODO: define colors in SVGs/js
      switch (weatherDescription) {
        case "Clear":
          return colors.mainYellow;
        default:
          return colors.mainLightGray;
      }
    },
    defineBackground() {
      let sunset = new Date(this.todayForcast.sunset);
      if (sunset.getTime() > new Date().getTime()) {
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
      todayForcast: {},
      currentWeather: {},
      currentHour: new Date(),
      backgroundImage: "",
    };
  },
};
</script>

<style lang="scss">
#weather-box {
  color: white;
}

#weather-header {
  // background-color: chartreuse;
  height: 3vh;
  display: grid;

  grid-template-columns: 4fr 1fr;
  #weather-city-name {
    font-size: $standard-text-medium;
  }
  #weather-icon {
    height: 100%;
    justify-self: right;
  }
}

#temperature-info-overview {
  // background-color: red;
  height: 4vh;
  display: grid;

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
  height: 6vh;
  display: grid;

  grid-template-columns: repeat(6, 1fr);
  column-gap: 1vh;
  .temperature-hour-content {
    // text-align: center;
    display: grid;
    grid-template-rows: 1.5vh 3vh 1.5vh;

    // justify-items: center;
    align-items: center;

    .weather-hour {
      font-size: 1.3vh;
      opacity: 80%;
    }
    .weather-icon-wrapper {
      display: flex;
      // justify-content: center;
      // vertical-align: middle;
    }

    .weather-hour-icon {
      fill: white;
    }

    .weather-hour-temperature {
      font-size: 1.2vh;
      font-weight: 700;
    }
  }
}
</style>
