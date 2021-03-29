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
        <HorizontalBarController
          id="light-intensity-control"
          :iconName="'sun'"
        />
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
  -moz-appearance: none;
  appearance: none;
  width: 0px;
  background: #fff;
  color: white;
  box-shadow: -100vw 0 0 100vw #ffffff;
}

#light-intensity-info-box {
  width: 100%;
  height: 100%;
}

#light-intensity-bar-border {
  background-color: rgba(245, 245, 245, 0.571);
  border-radius: 10px;
  width: 100%;
}

#light-intensity-control-wrapper {
  height: 80%;
  display: grid;
  align-content: flex-end;
}

#light-intensity-control {
  height: 5vh;
  width: 100%;
}
</style>
