<template>
  <div>
    <div class="forecast-stack-wrapper" v-if="Object.keys(this.weatherForecast).length > 0">
      <DayForecast :weatherForecast="weatherForecast" />
      <WeekForecast />
    </div>
    <div
      v-else
      id="weather-box"
      class="basic-card main-info-box main-info-box-small"
      :style="{ backgroundImage: this.backgroundImage }"
    >
      <div class="weather-service-info">Weather Service not available</div>
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
export default {
  components: { DayForecast, WeekForecast },

  created() {
    this.weatherForecastDataFormAPI();
  },
  methods: {
    weatherForecastDataFormAPI() {
      if (this.$store.getters.config.weather.api_key.length === 0) return;
      const { api_key, open_weather_url } = this.$store.getters.config.weather;

      this.$axios
        .get(`${open_weather_url}&appid=${api_key}`, {})
        .then((response) => {
          console.log(response.data);
          this.weatherForecast = response.data;
        })
        .catch((error) => {
          this.showToastError("Error while getting current Weather Data");
          console.log(error);
        });
    },
  },
  data() {
    return {
      weatherForecast: {},
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

.weather-service-info {
  display: grid;
  justify-content: center;
  align-content: center;
  height: 100%;
  color: $main-gray;
}
</style>
