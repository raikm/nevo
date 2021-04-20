<template>
  <div>
    <div
      id="forecast-stack-wrapper"
      v-if="Object.keys(this.weatherForecast).length > 0"
    >
      <DayForecast
        :style="{ backgroundImage: this.backgroundImage }"
        :weatherForecast="weatherForecast"
      />
      <WeekForecast />
    </div>
    <div
      v-else
      class="basic-card main-info-box main-info-box-small"
      :style="{ backgroundImage: this.backgroundImage }"
    >
      <div id="weather-service-info">Weather Service not available</div>
    </div>
  </div>
</template>

<script>
import "@/compiled-icons/Weather_Clear";
import "@/compiled-icons/Weather_Clouds_2";
import "@/compiled-icons/Weather_Clouds_Day";
import "@/compiled-icons/Weather_Clouds";
import "@/compiled-icons/Weather_Mist";
import "@/compiled-icons/Weather_Rain";
import "@/compiled-icons/Weather_Snow";
import "@/compiled-icons/Weather_Sunrise";
import "@/compiled-icons/Weather_Sunset";
import "@/compiled-icons/Weather_Thunderstorm";
import DayForecast from "./DayForecast";
import WeekForecast from "./WeekForecast";
import { mapState } from "vuex";
export default {
  components: { DayForecast, WeekForecast },
  created() {
    this.weatherForecastDataFromAPI();
  },
  computed: {
    ...mapState(["config"]),
  },
  methods: {
    weatherForecastDataFromAPI() {
      if (this.config.weather.api_key.length === 0) return;
      const { api_key, open_weather_url } = this.config.weather;

      this.$axios
        .get(`${open_weather_url}&appid=${api_key}`, {})
        .then((response) => {
          this.weatherForecast = response.data;
          this.defineBackground();
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    defineBackground() {
      let sunset = new Date(this.weatherForecast.daily[0].sunset);
      let sunsetInMinutes = sunset.getHours() * 60 + sunset.getMinutes();
      let now = new Date();
      let nowInMinutes = now.getHours() * 60 + now.getMinutes();
      //DAY
      if (sunsetInMinutes > nowInMinutes) {
        switch (this.weatherForecast.current.weather[0].main) {
          case "Snow":
            this.backgroundImage =
              "linear-gradient(-150deg, #045d73 0%, #676b82 100%)";
            break;
          case "Rain":
            this.backgroundImage =
              "linear-gradient(-150deg, #045d73 0%, #676b82 100%)";
            break;
          default:
            this.backgroundImage =
              "linear-gradient(-150deg, #5ea5c9 100%, #2374bb 0%)";
            break;
        }
      }
      //NIGHT
      else {
        this.backgroundImage =
          "linear-gradient(-150deg, #045d73 0%, #676b82 100%)";
      }
    },
  },
  data() {
    return {
      weatherForecast: {},
      backgroundImage: "linear-gradient(-150deg, #7de2fc 0%, #b6bee5 100%)",
    };
  },
};
</script>

<style lang="scss">
#weather-header {
  // background-color: chartreuse;
  height: 3vh;
  display: grid;
  color: white;
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
  height: 6vh;
  display: grid;
  color: white;
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

#weather-service-info {
  display: grid;
  justify-content: center;
  align-content: center;
  height: 100%;
  color: $main-gray;
}
</style>
