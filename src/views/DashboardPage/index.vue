<template>
  <main>
    <div class="standard-information-row-container">
      <!-- <TemperatureMainInfoBox class="small-box" /> -->
      <WeatherMainInfoBox class="small-box" />
      <!-- <LightIntensityMainInfoBox class="small-box" /> -->
      <!-- <PublicTransportMainInfoBox class="big-box" /> -->
      <!-- <Calendar class="big-box" /> -->
      <!-- <MusicControlMainInfoBox class="big-box" /> -->
    </div>
    
    <!-- <div class="shortcut-boxes">
      <ShortcutBox
        :key="shortcut.index"
        v-for="shortcut in this.$store.getters.shortcutEntities"
        :shortcut="shortcut"
      />
    </div> -->
    <!-- <div>{{mainPageWidth}}x{{containerSceneHeight}}</div> -->
  </main>
</template>

<script lang="ts">
// import TemperatureMainInfoBox from "./MainInfoBoxes/TempHumidity/index.vue";
import WeatherMainInfoBox from "./MainInfoBoxes/Weather/index.vue";
// import LightIntensityMainInfoBox from "./MainInfoBoxes/LightIntensity/index.vue";
// import PublicTransportMainInfoBox from "./MainInfoBoxes/PublicTransport/index.vue";
// import Calendar from "./MainInfoBoxes/Calendar/index.vue";
// import MusicControlMainInfoBox from "./MainInfoBoxes/MusicPlayer/index.vue";
// import ShortcutBox from "./ShortcutBox.vue";

export default {
  name: "DashboardPage",
  components: {
    // TemperatureMainInfoBox,
    WeatherMainInfoBox,
    // LightIntensityMainInfoBox,
    // PublicTransportMainInfoBox,
    // Calendar,
    // MusicControlMainInfoBox,
    // ShortcutBox,
  },
  mounted() {
    // this.mainPageWidth = window.innerWidth;
    // this.containerSceneHeight = window.innerHeight;
  },
  data() {
    return {
      // mainPageWidth: 0,
    };
  },
};
</script>

<style lang="scss">
.main-info-box-small {
  height: 15vh;
}


.large-widget {
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
  font-size: 1.5rem;
}

#scene-buttons {
  height: auto;
  width: 100%;
  // overflow-x: scroll;
  // overflow-y: hidden;
  overflow: auto;
  margin-top: $standard-space;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  row-gap: $standard-space;
  column-gap: $standard-space;
  // width: 100%;
  // justify-content: space-between;
}

.shortcut-boxes {
  display: inline-flex;
  overflow: scroll;
  display: grid;

  grid-template-columns: repeat(9, 1fr);
  // row-gap: $standard-space;
  column-gap: $standard-space;

}

.shortcut-boxes > div {
  height: 8vh;
  width: 10vh;
  
}
</style>
