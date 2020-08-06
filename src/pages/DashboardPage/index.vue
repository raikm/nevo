<template>
  <main>
      <div class="column">
        <TemperatureMainInfoBox />
        <HumidityMainInfoBox />
        <LightIntensityMainInfoBox />
        <PublicTransportMainInfoBox />
        <CalendarMainInfoBox />
        <MusicControlMainInfoBox />
        <MusicControlMainInfoBox />
        <MainSceneBox id="scene-buttons" />
      </div>
  </main>
</template>

<script>
import TemperatureMainInfoBox from "../../components/MainInfoBoxes/TemperatureMainInfoBox";
import HumidityMainInfoBox from "../../components/MainInfoBoxes/HumidityMainInfoBox";
import LightIntensityMainInfoBox from "../../components/MainInfoBoxes/LightIntensityMainInfoBox";
import PublicTransportMainInfoBox from "../../components/MainInfoBoxes/PublicTransportMainInfoBox";
import CalendarMainInfoBox from "../../components/MainInfoBoxes/CalendarMainInfoBox";
import MusicControlMainInfoBox from "../../components/MainInfoBoxes/MusicControlMainInfoBox";
import MainSceneBox from "../../components/SceneBoxes/MainSceneBox";


export default {
  name: "DashboardPage",
  components: {
    TemperatureMainInfoBox,
    HumidityMainInfoBox,
    LightIntensityMainInfoBox,
    PublicTransportMainInfoBox,
    CalendarMainInfoBox,
    MusicControlMainInfoBox,
    MainSceneBox,
  },
  data() {
    return {
    
    };
  },
};
</script>

<style lang="scss">

.main-info-box {
  float: left;
  width: 30%;
}

.main-info-box-small {
  height: 15vh;
}

.main-info-box-big {
  height: 25vh;
}
.main-info-header {
  // display: inline-flex;
  font-size: 2.8vh;
  height: 3vh;
  line-height: 3vh;
  margin-bottom: 1.6%;
  // overflow: hidden;
}

.main-info-title {
  margin-left: 13%;
}

#scene-buttons {
  // background-color: pink;
  margin-top: 1.6%;
  height: 16vh;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 0.5vh;
  white-space: nowrap;
  width: 100%;
}


</style>
