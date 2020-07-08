<template>
  <div class="plant-card-container">
    <div
      class="basic-card plant-card click-element"
      v-bind:key="plant.plant_id"
      v-for="plant in plantInformation"
      @click="getCurrentPlantData(plant.plant_id); showModal = true; currentPlant = plant;"
    >
      <h1 class="main-info-header">{{ plant.name.replace(/[_-]/g, " ") }}</h1>
      <PlantInfo :plant="plant" />
    </div>
    <div class="popup-container">
      <transition name="fade" appear>
        <div
          class="modal-overlay"
          v-if="showModal"
          @click="showModal = false"
        ></div>
      </transition>

      <transition name="slide" appear>
        <div class="basic-card plant-popup-window" v-if="showModal">
          <PlantHistoryPage :currentPlantInformationHistory="currentPlantInformationHistory" />

        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import PlantInfo from "./PlantInfo";
import PlantHistoryPage from "./PlantHistoryPage";

export default {
  name: "PlantCard",
  components: {
    PlantInfo,
    PlantHistoryPage,
  },
  props: ["plantInformation"],
  data() {
    return {
      currentPlant: {},
      currentPlantInformationHistory: {},
      showModal: false,
    };
  },
  methods: {
    getCurrentPlantData(plant_id) {
        console.log(plant_id)
        this.$axios
        .get("http://localhost:8000/planthistory/" + plant_id + "/",
         {
        })
        .then((response) => {
          this.currentPlantInformationHistory = response.data;
          console.log(this.currentPlantInformationHistory)
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss">
.plant-card {
  float: left;
  height: 16vh;
  width: 21.8%;
}

.popup-container {
  justify-content: center;
  align-items: center;
  width: 100%;
  // min-height: 100vh;
  // overflow: hidden;
  // background-color: salmon;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(250, 250, 250, 0.41);
}
.plant-popup-window {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  height: 40%;
  width: 80%;
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
