<template>
  <div class="plant-info-container">
    <div class="plant-attribute-header-info">
      <svgicon
        class="plant-detail-icon"
        icon="soil_moist"
        width="1.5vh"
        height="1.5vh"
      ></svgicon>
      <div class="plant-detail-title">Soil Moisture</div>
    </div>

    <div class="bar-container">
      <div class="info-bar-background">
        <div
          class="info-bar"
          :style="{
            width:
              (plant.soil_moisture / plant.soil_moisture_borders.max) * 100 +
              '%',
          }"
        ></div>
      </div>
    </div>
    <div class="plant-attribute-header-info">
      <svgicon
        class="plant-detail-icon"
        icon="fertilizer"
        width="1.5vh"
        height="1.5vh"
      ></svgicon>
      <div class="plant-detail-title">Fertilizer</div>
    </div>

    <div class="bar-container">
      <div class="info-bar-background">
        <div
          class="info-bar"
          :style="{
            width:
              (plant.soil_fertility / plant.soil_fertitlity_borders.max) * 100 +
              '%',
          }"
        ></div>
      </div>
    </div>
        <div class="plant-attribute-header-info">
      <svgicon
        class="plant-detail-icon"
        icon="sun"
        width="1.5vh"
        height="1.5vh"
      ></svgicon>
      <div class="plant-detail-title">Sun Intensity</div>
    </div>

    <div class="bar-container">
      <div class="info-bar-background">
        <div
          class="info-bar"
          :style="{
            width:
              (plant.sunlight / plant.sunlight_intensity_borders.max) * 100 +
              '%',
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../compiled-icons/fertilizer";
import "../../compiled-icons/sun";
import "../../compiled-icons/soil_moist";

export default {
  name: "PlantInfo",
  props: ["plant"],
  mounted: function() {},
};
</script>

<style lang="scss">
@import "../../style/main-colors";

.left {
  margin-right: 1.5vh;
  float: left;
}
.icon-svg {
  display: flex;
  border: rgba(0, 0, 0, 0.8);
  background-color: rgba(40, 119, 48, 1);
  border-radius: 4px;
  height: 2.5vh;
  width: 2.5vh;
  margin-bottom: 1vh;
  padding: 15%;
  fill: rgba(250, 250, 250, 1);
}

.plant-attribute-header-info {
  height: 1.5vh;
  margin-bottom: 0.4vh;
    display: flex;
    align-items: flex-end;
  .plant-detail-icon {
    color: red;
    float: left;
    margin-right: 1%;

  }

  .plant-detail-title {
    overflow: hidden;
    line-height: 100%;
    display: flex;
    align-items: flex-end;
    font-size: 1vh;
    height: 100%;
  }
}

.iconImg {
  height: 2.5vh;
  width: 2.5vh;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
}

.right {
  padding-top: 0.25vh;
  margin-left: 2vh;
  overflow: hidden;
  /* height: 100%; */
}

.info-bar {
  margin-bottom: 0.5vh;
  height: 1vh;
  background-color: $main-green;
  border-radius: 4px;
}

.info-bar-background {
  background-color: rgb(245, 245, 245);
  border-radius: 5px;
}
</style>
