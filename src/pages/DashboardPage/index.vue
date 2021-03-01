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

      <!-- <PublicTransportMainInfoBox class="big-box" /> -->
      <CalendarMainInfoBox class="big-box" />
      <MusicControlMainInfoBox class="big-box" />
    </div>


    <MainSceneBox
      ref="sceneButtons"
      :containerWidth="containerSceneWidth"
      id="scene-buttons"
    />
  </main>
</template>

<script>
import TemperatureMainInfoBox from "../../components/MainInfoBoxes/TemperatureMainInfoBox";
import WeatherMainInfoBox from "../../components/MainInfoBoxes/WeatherMainInfoBox";
import LightIntensityMainInfoBox from "../../components/MainInfoBoxes/LightIntensityMainInfoBox";
// import PublicTransportMainInfoBox from "../../components/MainInfoBoxes/PublicTransportMainInfoBox";
import CalendarMainInfoBox from "../../components/MainInfoBoxes/CalendarMainInfoBox";
import MusicControlMainInfoBox from "../../components/MainInfoBoxes/MusicControlMainInfoBox";
import MainSceneBox from "../../components/SceneBoxes/MainSceneBox";
// import RoomControlBox from "../../components/ShortcutBoxes/RoomControlBox";
// import EBikeMainInfoBox from "../../components/MainInfoBoxes/EBikeMainInfoBox";

export default {
  name: "DashboardPage",
  components: {
    TemperatureMainInfoBox,
    WeatherMainInfoBox,
    LightIntensityMainInfoBox,
    // PublicTransportMainInfoBox,
    CalendarMainInfoBox,
    MusicControlMainInfoBox,
    // RoomControlBox,
    // EBikeMainInfoBox,
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
  display: none;
  // overflow-x: scroll;
  // overflow-y: hidden;
  overflow: auto;

  // display: grid;
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
