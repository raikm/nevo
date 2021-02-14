<template>
  <div class="plant-info-container">
    <div class="plant-attribute-info">
      <div class="plant-attribute-header-info">
        <svgicon
          class="plant-detail-icon"
          icon="soil_moist"
          width="1rem"
          height="1rem"
        ></svgicon>

        <div class="plant-detail-title">Soil Moisture</div>
      </div>
      <ProgressBarWithTrend
        :barColor="colors.mainBlue"
        :plantValue="plant.soil_moisture"
        :valueMinBorder="plant.soil_moisture_borders.min"
        :valueMaxBorder="plant.soil_moisture_borders.max"
        :barHeight="'0.5vw'"
      />
    </div>
    <div class="plant-attribute-info">
      <div class="plant-attribute-header-info">
        <svgicon
          class="plant-detail-icon"
          icon="fertilizer"
          width="1rem"
          height="1rem"
        ></svgicon>
        <div class="plant-detail-title">Fertilizer</div>
      </div>

      <ProgressBarWithTrend
        :barColor="colors.mainGreen"
        :plantValue="plant.soil_fertility"
        :valueMinBorder="plant.soil_fertitlity_borders.min"
        :valueMaxBorder="plant.soil_fertitlity_borders.max"
        :barHeight="'0.5vw'"
      />
    </div>
    <div class="plant-attribute-info">
      <div class="plant-attribute-header-info">
        <svgicon
          class="plant-detail-icon"
          icon="sun"
          width="1rem"
          height="1rem"
        ></svgicon>
        <div class="plant-detail-title">Sun Intensity</div>
      </div>
      <ProgressBarWithTrend
        :barColor="colors.mainYellow"
        :plantValue="plant.sunlight"
        :valueMinBorder="plant.sunlight_intensity_borders.min"
        :valueMaxBorder="plant.sunlight_intensity_borders.max"
        :barHeight="'0.5vw'"
      />
    </div>
  </div>
</template>

<script>
import "../../compiled-icons/fertilizer";
import "../../compiled-icons/sun";
import "../../compiled-icons/soil_moist";
import ProgressBarWithTrend from "../../components/ProgressBarWithTrend";
import colors from "../../style/main-colors.scss";

export default {
  name: "PlantInfo",
  props: ["plant"],
  data() {
    return {
      colors: colors,
    };
  },
  components: { ProgressBarWithTrend },
  mounted: function() {},
};
</script>

<style lang="scss">
@import "../../style/main-colors";

.plant-info-container {
  height: auto;
}

.plant-attribute-info{
  height: 30%;
}

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
  height: auto;
  margin-bottom: 0.4vh;
  display: flex;
  align-items: flex-end;
  .plant-detail-icon {
    float: left;
    margin-right: 1%;
  }

  .plant-detail-title {
    overflow: hidden;
    line-height: 100%;
    display: flex;
    align-items: flex-end;
    font-size: 1rem;
    height: 100%;
    width: 100%;
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
  border-radius: 4px;
}

.info-bar-background {
  background-color: rgb(245, 245, 245);
  border-radius: 5px;
}
</style>
