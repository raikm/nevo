<template>
  <div class="plant-card-container">
    <div
      class="box box-white plant-card"
      v-bind:key="plant.id"
      v-for="plant in plantInformation"
      @click="showPlantHistory = true; currentPlant = plant;
      "
    >
      <div class="plant-header-container">
        <h1 class="plant-header">{{ plant.name.replace(/[_-]/g, " ") }}</h1>
        <!-- Location Header -->
        <div class="location-container-wrapper">
          <component class="location-container" :is="plantlocationIcon(plant.location.location)"></component>
        </div>
      </div>
      <div class="plant-info-container">
        <div class="plant-attribute-info">
          <div class="plant-attribute-header-info">
            <!-- <svgicon class="plant-detail-icon" icon="soil_moist" width="1rem" height="1rem"></svgicon> -->

            <div class="plant-detail-title">Soil Moisture</div>
          </div>
          <PlantDataProgressBar
            barColor="#007bffcc"
            :plantValue="plant.soil_moisture"
            :valueMinBorder="plant.soil_moisture_borders.min"
            :valueMaxBorder="plant.soil_moisture_borders.max"
            :barHeight="'0.5vw'"
          />
        </div>
        <div class="plant-attribute-info">
          <div class="plant-attribute-header-info">
            <!-- <svgicon class="plant-detail-icon" icon="fertilizer" width="1rem" height="1rem"></svgicon> -->
            <div class="plant-detail-title">Fertilizer</div>
          </div>

          <PlantDataProgressBar
            barColor="#4a7277"
            :plantValue="plant.soil_fertility"
            :valueMinBorder="plant.soil_fertitlity_borders.min"
            :valueMaxBorder="plant.soil_fertitlity_borders.max"
            :barHeight="'0.5vw'"
          />
        </div>
        <div class="plant-attribute-info">
          <div class="plant-attribute-header-info">
            <!-- <svgicon class="plant-detail-icon" icon="sun" width="1rem" height="1rem"></svgicon> -->
            <div class="plant-detail-title">Sun Intensity</div>
          </div>
          <PlantDataProgressBar
            barColor="#ffe17d"
            :plantValue="plant.sunlight"
            :valueMinBorder="plant.sunlight_intensity_borders.min"
            :valueMaxBorder="plant.sunlight_intensity_borders.max"
            :barHeight="'0.5vw'"
          />
        </div>
      </div>
      <div class="plant-card-footer" v-if="checkDataAge(plant)">⬤</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Plant } from "../../types/plant.interface";
import * as colors from "../../styles/variables.scss";

import PlantDataProgressBar from "./PlantDataProgressBar.vue";
import CouchIcon from "../../assets/icons/location_couch.svg";
import OfficeIcon from "../../assets/icons/location_office.svg";
import KitchenIcon from "../../assets/icons/location_office.svg";
import BedroomIcon from "../../assets/icons/location_office.svg";
import EntranceIcon from "../../assets/icons/location_office.svg";
import Bedroom_balconyIcon from "../../assets/icons/location_office.svg";

export default defineComponent({
  name: "PlantCards",
  components: {
    PlantDataProgressBar,
    CouchIcon,
    OfficeIcon,
    KitchenIcon,
    BedroomIcon,
    EntranceIcon,
    Bedroom_balconyIcon
  },
  props: {
    plantInformation: { required: true, type: Object as PropType<Array<Plant>> }
  },

  setup(props) {
    const plantlocationIcon = (location: string) => {
      // console.log(`${location}Icon`)
      return `${location}Icon`;
    }
    const checkDataAge = (plant: Plant) => {
      const plantdate = new Date(plant.timestamp)
      let hours = Math.abs(plantdate.getTime() - new Date().getTime()) / 3600000;
      if (hours < 24) {
        return false
      } else {
        return true
      }
    }

    return {
      colors: colors,
      currentPlant: {} as Plant,
      showPlantHistory: false,
      plantlocationIcon,
      checkDataAge,
    }
  }
});
</script>

<style lang="scss">
@import "../../styles/variables.scss";

.plant-header-container {
  display: grid;
  grid-template-columns: 90% 10%;
  z-index: 98;
}
.plant-header {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 0;
  font-size: $standard-text-big;
}
.location-container-wrapper {
  border: rgba(0, 0, 0, 0.8);
  border-style: solid;
  border-width: 0.5px;
  border-radius: 50%;
  justify-self: center;
  display: grid;
  justify-content: center;
  justify-items: center;
  width: 100%;
  height: 100%;
}
.location-container-wrapper > svg {
  margin: 10% 0;
  width: 80%;
  height: 80%;
  fill: black;
}

@media (max-width: 1600px) {
  .plant-card-container {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: $standard-space;
  }
}

@media (min-width: 1600px) {
  .plant-card-container {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
}

.plant-card-container {
  // margin-top: 1%;

  display: grid;
  // grid-column-gap: $standard-space;
  // grid-row-gap: $standard-space;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  // height:100%;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.plant-card-container::-webkit-scrollbar {
  display: none;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(250, 250, 250, 0.91);
}

.plant-popup-window-frame {
  position: absolute;
  top: 11%;
  left: 0%;
  right: 0%;

  // height: 5vh;
}

#cancel-icon {
  position: absolute;
  right: 0;
  // float: right;
  margin-right: 5%;
  margin-top: 0.3%;
  // color: $text-color;
  z-index: 99;
}

.plant-popup-window {
  position: absolute;
  top: 11%;
  left: 0%;
  right: 0%;

  // transform: translate(-50%, -50%);
  z-index: 99;
  // height: 50%;
  //background-color: white !important;
}

.fade-enter-active,
fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
fade-leave-to {
  opacity: 0;
}

.info-bar-fertilizer {
  background-color: $green;
}

.info-bar-moisture {
  background-color: $blue;
}

.info-bar-sun {
  background-color: $yellow;
}

.plant-info-container {
  height: auto;
}

.plant-attribute-info {
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

.plant-card-footer {
  display: grid;
  justify-content: right;
  font-size: xx-small;
  opacity: 50%;
  color: red;
}
</style>
