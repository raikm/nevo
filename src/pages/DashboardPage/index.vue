<template>
  <main>
    <!-- <div class="standard-information-row-container-small">
      <RoomControlBox class="Room-Control-Box" />
      <EBikeMainInfoBox class="EBike-Box" /> 
    </div> -->
    <div class="standard-information-row-container">
      <TemperatureMainInfoBox class="small-box" />
      <WeatherMainInfoBox class="small-box" />
      <LightIntensityMainInfoBox class="small-box" />

      <PublicTransportMainInfoBox class="big-box" />
      <CalendarMainInfoBox class="big-box" />
      <MusicControlMainInfoBox class="big-box" />
    </div>
    
    <MainSceneBox
      ref="sceneButtons"
      :containerWidth="containerSceneWidth"
      id="scene-buttons"
    />

    <!-- <div>{{containerSceneWidth}}x{{containerSceneHeight}}</div> -->
  </main>
</template>

<script>
import TemperatureMainInfoBox from "./MainInfoBoxes/TempHumidity";
import WeatherMainInfoBox from "./MainInfoBoxes/Weather";
import LightIntensityMainInfoBox from "./MainInfoBoxes/LightIntensity";
import PublicTransportMainInfoBox from "./MainInfoBoxes/PublicTransport/PublicTransportMainInfoBox";
import CalendarMainInfoBox from "./MainInfoBoxes/Calendar/CalendarMainInfoBox";
import MusicControlMainInfoBox from "./MainInfoBoxes/MusicPlayer/MusicControlMainInfoBox";
import MainSceneBox from "./SceneBoxes/MainSceneBox";
// import RoomControlBox from "./ShortcutBoxes/RoomControlBox";
// import EBikeMainInfoBox from "./MainInfoBoxes/EBikeMainInfoBox";

export default {
  name: "DashboardPage",
  components: {
    TemperatureMainInfoBox,
    WeatherMainInfoBox,
    LightIntensityMainInfoBox,
    PublicTransportMainInfoBox,
    CalendarMainInfoBox,
    MusicControlMainInfoBox,
    MainSceneBox,
  },
  created() {},
  mounted() {
    this.containerSceneWidth = window.innerWidth;
    // this.containerSceneHeight = window.innerHeight;
    
  },
  data() {
    return {
      containerSceneWidth: 0,
    };
  },
};
</script>

<style lang="scss">

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
  height: 20%;
  // margin-bottom: 1.6%;

  // overflow: hidden;
  .main-info-title {
    font-size: 1.8vh;
  }
}

.main-box-body {
  height: 80%;
}

.main-info-header-medium {
  // display: inline-flex;
  font-size: 1.5em;
  //line-height: 3vh;
  margin-bottom: 1.6%;
  font-weight: 500;
  // overflow: hidden;
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
  margin-top: $standard-space;
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
