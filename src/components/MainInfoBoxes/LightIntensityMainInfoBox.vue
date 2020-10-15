<template>
  <div class="basic-card main-info-box main-info-box-small">
    <div id="light-intensity-info-box" :lightintensityInfo="lightintensityInfo">
      <div class="main-info-header">
        <h1 class="main-info-title">
          Light intensity
        </h1>
       
      </div>
      <!-- <div id="light-intensity-bar-border">
        <div
          id="light-intensity-bar"
          :style="{ width: lightintensityInfo.value + '%' }"
        ></div>
      </div> -->

      <div id="light-intensity-control-wrapper">
        <HorizontalBarController id="light-intensity-control" />
        <div id="light-intensity-icon-container">
          <svgicon id="light-intensity-icon" icon="sun"></svgicon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HorizontalBarController from "../InteractionController/HorizontalBarController";

export default {
  name: "LightIntensityMainInfoBox",
  components: { HorizontalBarController },
  props: [],
  data() {
    return {
      lightintensityInfo: {
        id: 1,
        value: 70,
      },
    };
  },
};
</script>

<style lang="scss">
#light-intensity-control::-webkit-slider-thumb {
  -webkit-appearance: none;
  -webkit-touch-appearance: none;
  width: 0px; /* 1 */
  background: #fff;
  box-shadow: -100vw 0 0 100vw #ffffff;
}

#light-intensity-info-box {
  float: left;
  margin-right: 10px;
  width: 100%;
}

#light-intensity-bar-border {
  background-color: rgba(245, 245, 245, 0.571);
  border-radius: 10px;
  width: 100%;
}

#light-intensity-control-wrapper {
  margin-top: 15%;
  height: 30%;
  position: relative;
}
#light-intensity-icon-container {
  height: 100%;
  position: absolute;
  z-index: 99;
  pointer-events: none;
}
#light-intensity-icon {
  height: 2vh;
  margin: 1.5vh;
  fill: lightgray;
}

#light-intensity-control {
  position: absolute;
  z-index: 98;
  height: 5vh;
  width: 100%;
}
</style>
