<template>
  <main>
      <div class="column">
        <TemperatureMainInfoBox />
        <HumidityMainInfoBox />
        <LightIntensityMainInfoBox />
        <PublicTransportMainInfoBox />
        <CalendarMainInfoBox />
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
      temperature: 99.9,     
    };
  },
};
</script>

<style lang="scss">

.main-info-box {
  background-color: white;
  border-radius: 10px;
  border-color: rgb(243, 244, 254);
  border-width: 1px;
  border-style: solid;
  // box-shadow: 0 1px 2px 0;
  float: left;
  width: 30%;
  margin: 1.6% 1.6%;
  padding: 1vh;
}

.main-info-box-small {
  height: 15vh;
}

.main-info-box-big {
  height: 25vh;
}
.main-info-header {
  display: inline-flex;
  font-size: 2.8vh;
  height: 3vh;
  line-height: 3vh;

  overflow: hidden;
}
.main-info-icon {
  float: left;
  height: 3vh;
}
.main-info-title {
  padding-left: 1vh;
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
