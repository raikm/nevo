<template>
  <main>
    <div class="standard-information-row-container-small">
      <RoomControlBox class="Room-Control-Box" />
      <!-- <EBikeMainInfoBox class="EBike-Box" /> -->
    </div>
    <div class="standard-information-row-container">
      <TemperatureMainInfoBox class="Temperature-Box" />
      <WeatherMainInfoBox class="Weather-Box" />
      <LightIntensityMainInfoBox class="Lightintensity-Box" />
    </div>
    <div class="flexible-information-row-container-small">
      <PublicTransportMainInfoBox class="PubicTransport-Box" />
      <CalendarMainInfoBox class="Calendar-Box" />
      <MusicControlMainInfoBox class="Music-Control-Box" />
    </div>
    <MainSceneBox ref="sceneButtons" :containerWidth="containerSceneWidth" id="scene-buttons" />
  </main>
</template>

<script>
import TemperatureMainInfoBox from "../../components/MainInfoBoxes/TemperatureMainInfoBox";
import WeatherMainInfoBox from "../../components/MainInfoBoxes/WeatherMainInfoBox";
import LightIntensityMainInfoBox from "../../components/MainInfoBoxes/LightIntensityMainInfoBox";
import PublicTransportMainInfoBox from "../../components/MainInfoBoxes/PublicTransportMainInfoBox";
import CalendarMainInfoBox from "../../components/MainInfoBoxes/CalendarMainInfoBox";
import MusicControlMainInfoBox from "../../components/MainInfoBoxes/MusicControlMainInfoBox";
import MainSceneBox from "../../components/SceneBoxes/MainSceneBox";
import RoomControlBox from "../../components/ShortcutBoxes/RoomControlBox";
// import EBikeMainInfoBox from "../../components/MainInfoBoxes/EBikeMainInfoBox";

export default {
  name: "DashboardPage",
  components: {
    TemperatureMainInfoBox,
    WeatherMainInfoBox,
    LightIntensityMainInfoBox,
    PublicTransportMainInfoBox,
    CalendarMainInfoBox,
    MusicControlMainInfoBox,
    RoomControlBox,
    // EBikeMainInfoBox,
    MainSceneBox,
  },
  created(){
  },
  mounted() {
    this.containerSceneWidth = window.innerWidth * 0.65;
    console.log(this.containerSceneWidth)
  },
  data() {
    return {
      containerSceneWidth: 0,
    };
  },
};
</script>

<style lang="scss">
@import "../../style/main-style";


.standard-information-row-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.6%;

  .Temperature-Box {
    width: 31%;
  }
  .Weather-Box {
    width: 31%;
  }
  .Lightintensity-Box {
    width: 31%;
  }
}

.standard-information-row-container-small {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.6%;
  .Room-Control-Box {
    width: 65.5%;
    height: 10vh;
  }

  .EBike-Box {
    width: 31%;
    height: 10vh;
  }
}

.flexible-information-row-container-small {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.6%;
  .PubicTransport-Box {
    width: 31%;
  }

  .Calendar-Box {
    width: 31%;
  }

  .Music-Control-Box {
    width: 31%;
  }
}

.main-info-box-small {
  height: 15vh;
}
.main-info-box-small div {
}

.main-info-box-big {
  height: 25vh;
  max-height: 25vh;
}

.main-info-header {
  display: grid;
  grid-template-columns: 9fr 1fr;

  height: 3vh;
  line-height: 3vh;
  margin-bottom: 1.6%;
  // overflow: hidden;
}

.main-info-header-medium {
  // display: inline-flex;
  font-size: 1.5em;
  //line-height: 3vh;
  margin-bottom: 1.6%;
  font-weight: 500;
  // overflow: hidden;
}

.main-info-title {
  font-size: 1.8vh;
}

.main-info-title-big {
  font-size: 200%;
}

#scene-buttons {
  height: auto;
  width: 100%;
  // overflow-x: scroll;
  // overflow-y: hidden;
  overflow: auto;
  
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  row-gap: $standard-space;
  column-gap: $standard-space;
  // width: 100%;
  // justify-content: space-between;
}

#scene-buttons > div {
  // margin-right: 15px;
}
</style>
