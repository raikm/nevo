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
    <div class="element-wrapper" @click="openNewPlantPage()">
      <ActionElement lableName="Add new Plant"></ActionElement>
    </div>
  </div>
</template>

<script>
import InfoElementWithMore from "./Components/InfoElementWithMore";
import ActionElement from "./Components/ActionElement";
export default {
  name: "Plants",
  components: { InfoElementWithMore, ActionElement },
  created() {
    this.getAllPlants();
  },
  data() {
    return {
      plants: [],
    };
  },
  methods: {
    getAllPlants() {
      this.$axios
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
      this.$router.push({
        path: "/SettingsPage/PlantsDetail",
        query: newPlantObj,
      });
    },
  },
};
</script>

<style></style>
