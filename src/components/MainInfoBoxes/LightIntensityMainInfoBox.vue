<template>
  <div class="main-info-box main-info-box-small">
    <div id="light-intensity-info-box" :lightintensityInfo="lightintensityInfo">
      <div class="main-info-header">
        <img
          class="main-info-icon"
          src="../../../public/img/icons/bulb.svg"
        />
        <h1 class="main-info-title" id="light-intensity-header">
          Light intensity
        </h1>
      </div>
      <!-- <div id="light-intensity-bar-border">
        <div
          id="light-intensity-bar"
          :style="{ width: lightintensityInfo.value + '%' }"
        ></div>
      </div> -->
      <HorizontalBarController id="light-intensity-control" />
    </div>
  </div>
</template>

<script>
import HorizontalBarController from "../InteractionController/HorizontalBarController";

export default {
  name: "LightIntensityMainInfoBox",
  components: {HorizontalBarController},
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

#light-intensity-control {
  width: 100%;
  height: 5vh;
  margin-top: 4vh;
}
</style>
