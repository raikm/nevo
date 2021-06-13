<template>
  <div>
    <h1 class="title-1">{{ this.$options.name }}</h1>
    <div class="element-wrapper">
      <div :key="plant.id" v-for="plant in this.plants">
        <InfoElementWithMore
          :lableName="plant.name"
          :infotext="cleanConfigName(plant.location.location)"
          detailPageName="PlantsDetail"
          :data="plant"
        ></InfoElementWithMore>
      </div>
    </div>
    <div class="element-wrapper" @click="showPlantsensorFinder = true">
      <ActionElement lableName="Add new Plant"></ActionElement>
    </div>
    <div class="popup-container">
      <transition name="fade" appear>
        <div
          v-if="showPlantsensorFinder"
          @click="showPlantsensorFinder = false"
        ></div>
      </transition>
      <transition name="slide" appear>
        <div class="popup-window" v-if="showPlantsensorFinder">
          <PopUpWindow :windowWidth="30" popupTitle="Add new Plantsensors"   @leftEvent="showPlantsensorFinder = false" :leftInfo="'Close'"
            rightInfo="Save">
            <component :is="plantSensorFinderPage"></component>
          </PopUpWindow>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import InfoElementWithMore from "@/components/InfoFields/InfoElementWithMore";
import ActionElement from "@/components/Inputs/ActionElement";
import PopUpWindow from "../../components/PopUp";
import PlantSensorFinder from "./PlantSensorFinder";

export default {
  name: "Plants",
  components: {
    InfoElementWithMore,
    ActionElement,
    PopUpWindow,
    PlantSensorFinder,
  },
  created() {
    this.getAllPlants();
  },
  data() {
    return {
      plants: [],
      plantSensorFinderPage: "PlantSensorFinder",
      showPlantsensorFinder: false,
    };
  },
  methods: {
    getAllPlants() {
      this.axios
        .get(this.$store.getters.config.homeserver.url + ":8080/getAllPlants/")
        .then((response) => {
          this.plants = response.data;
        })
        .catch((error) => {
          this.showToastError(error.toString());
        });
    },
    openNewPlantPage() {
      let newPlantObj = {
        name: "",
        id: "",
        address: "",
        location: { location: "", location_details: "" },
        soil_fertitlity_borders: { min: "", max: "", currency: "" },
        soil_moisture_borders: { min: "", max: "", currency: "" },
        sunlight_intensity_borders: { min: "", max: "", currency: "" },
        temperature_borders: { min: "", max: "", currency: "" },
      };
      this.router.push({
        path: "/SettingsPage/PlantsDetail",
        query: newPlantObj,
      });
    },
  },
};
</script>

<style></style>
