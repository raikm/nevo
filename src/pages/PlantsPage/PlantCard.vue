<template>
  <div class="plant-card-container">
    <div
      class="basic-card plant-card click-element"
      v-bind:key="plant.plant_id"
      v-for="plant in plantInformation"
      @click="
        showPlantHistory = true;
        currentPlant = plant;
      "
    >
      <div class="plant-header-container">
        <h1 class="plant-header main-info-header-medium">
          {{ plant.name.replace(/[_-]/g, " ") }}
        </h1>
        <div
          class="location-container"
          @click="showLocationDetails(plant.location.location_details)"
        >
          <div class="location-frame">
            <svgicon
              class="location-icon"
              :icon="plant.location.location"
              width="60%"
              height="60%"
            ></svgicon>
          </div>
        </div>
      </div>
      <PlantInfo :plant="plant" />
    </div>
    <div class="popup-container">
      <transition name="fade" appear>
        <div
          class="modal-overlay"
          v-if="showPlantHistory"
          @click="showPlantHistory = false"
        ></div>
      </transition>

      <transition name="slide" appear>
        <div class="plant-popup-window" v-if="showPlantHistory">
          <PopUpWindow
            :windowWidth="90"
            :windowHeight="50"
            :popupTitle="currentPlant.name"
            :leftInfo="'Close'"
            :rightInfo="currentPlant.temperature.split('.')[0] + '°C'"
            @leftEvent="closeDialog"
          >
            <component
              :is="historyPage"
              :currentPlant="currentPlant"
            ></component>
          </PopUpWindow>

          <!-- <PlantHistoryPage :currentPlant="currentPlant" /> -->
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import PlantInfo from "./PlantInfo";
import PlantHistoryPage from "./PlantHistoryPage";
import PopUpWindow from "../../components/PopUpWindow/PopUpWindow";

import "../../compiled-icons/cancel";
import "../../compiled-icons/couch";
import "../../compiled-icons/dinning_table";
import "../../compiled-icons/office";
import "../../compiled-icons/loggia";

export default {
  name: "PlantCard",
  components: {
    PlantInfo,
    PlantHistoryPage,
    PopUpWindow,
  },
  props: ["plantInformation"],
  data() {
    return {
      currentPlant: {},
      showPlantHistory: false,
      historyPage: "PlantHistoryPage",
    };
  },
  methods: {
    showLocationDetails(plantInfoText) {
      event.stopPropagation();
      if (plantInfoText != "NULL") {
        this.showToastInfo(plantInfoText);
      }
    },
    closeDialog() {
      this.showPlantHistory = false;
    },
  },
};
</script>

<style lang="scss">

.plant-header-container {
  display: grid;
  grid-template-columns: 80% 20%;
  z-index: 98;
}
.plant-header {
  // width: 80%;
  // float: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.location-container {
  // overflow: hidden;

  .location-frame {
    border: rgba(0, 0, 0, 0.8);
    border-style: solid;
    border-width: 0.5px;
    border-radius: 50%;
    width: 2.9vh;
    height: 2.9vh;
    float: right;
    display: inline-flex;
  }
  .location-frame:hover,
  .location-frame:active {
    background-color: $main-black-transparent;
  }

  .location-icon {
    display: block;
    margin: auto;
  }
}

.plant-card {
  float: left;
  height: 100%;
  // width: 21.8%;
}

@media (max-width: 1600px) {
  .plant-card-container {
    grid-template-columns: 1fr 1fr 1fr 1fr;
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
  //grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 2%;
  grid-row-gap: 5%;
  height: 100%;
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
  color: $text-color;
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
</style>
