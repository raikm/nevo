<template>
  <div id="weather-box" class="basic-card main-info-box main-info-box-small">
    <div id="weather-header">
      <span id="weather-city-name">Berlin</span>
      <svgicon id="weather-icon" icon="sun_2"></svgicon>
    </div>
    <div id="temperature-info-overview">
      <span id="temperature-outdoor-info">16°</span>
      <div id="weather-description"><span>Sunny</span><span></span></div>
    </div>
    <div id="temperature-hour-info">
      <div
        class="temperature-hour-content"
        :key="temperatureHourInfo.id"
        v-for="temperatureHourInfo in temperatureHourInfos"
      >
        <span class="weather-hour">{{ temperatureHourInfo.hour }}</span>
        <svgicon
          class="weather-hour-icon"
          :icon="temperatureHourInfo.icon"
        ></svgicon>
        <span class="weather-hour-temperature">{{
          temperatureHourInfo.temperature
        }}°</span>
      </div>
    </div>
  </div>
</template>

<script>
// var serverAddress = "http://192.168.0.22:8181";
import "../../compiled-icons/sun_2";

export default {
  name: "WeatherMainInfoBox",
  components: {},
  props: [],
  data() {
    return {
      temperatureHourInfos: [
        {
          id: 1,
          hour: 12,
          temperature: 10,
          icon: "sun_2",
        },
        {
          id: 2,
          hour: 13,
          temperature: 11,
          icon: "sun_2",
        },
        {
          id: 3,
          hour: 14,
          temperature: 14,
          icon: "sun_2",
        },
        {
          id: 4,
          hour: 15,
          temperature: 16,
          icon: "sun_2",
        },
        {
          id: 5,
          hour: 16,
          temperature: 16,
          icon: "sun_2",
        },
        {
          id: 6,
          hour: 17,
          temperature: 16,
          icon: "sun_2",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "../../style/main-style";
@import "../../style/main-colors";


#weather-box{
  background-image: linear-gradient(-150deg, #7DE2FC 0%, #b6bee5 100%);
  color: white;
}

#weather-header {
  // background-color: chartreuse;
  height: 20%;
  display: grid;

  grid-template-columns: 4fr 1fr;
  #weather-city-name {
    font-size: $standard-text-medium;
    font-weight: bold;
  }
  #weather-icon {
    height: 100%;
    justify-self: right;
    fill: $main-yellow-2;
  }
}

#temperature-info-overview {
  // background-color: red;
  height: 35%;
  display: grid;

  grid-template-columns: 4fr 1fr;
  #temperature-outdoor-info {
    font-size: 3vh;
  }
  #weather-description {
    text-align: right;
    font-weight: bold;
  }
}

#temperature-hour-info {
  // background-color: blue;
  height: 45%;
  display: grid;

  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; //TODO: repeat
  .temperature-hour-content {
    // align-self: center;
    justify-self: center;
    text-align: center;
    display: flex;
    flex-direction: column;
    

    .weather-hour {
      font-size: medium;
      line-height: 1.7vh;
      
      
      font-weight: bold;
    }

    .weather-hour-icon {
      fill: $main-yellow-2;
      height: 2.5vh;
    }
    .weather-hour-temperature {
      
      
      font-weight: bold;
      
    }
  }
}
</style>
