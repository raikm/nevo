<template>
  <div class="plant-card-container">
    <div
      class="basic-card plant-card click-element"
      v-bind:key="plant.plant_id"
      v-for="plant in plantInformation"
      @click="
        showModal = true;
        currentPlant = plant;
      "
    >
      <h1 class="main-info-header-medium">{{ plant.name.replace(/[_-]/g, " ") }}</h1>
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
        <div class="plant-popup-window-frame" v-if="showModal">
          <svgicon
            id="cancel-icon"
            icon="cancel"
            width="24"
            height="24"
            @click="showModal = false"
          ></svgicon>
          <div class="basic-card plant-popup-window" v-if="showModal">
            <PlantHistoryPage :currentPlant="currentPlant" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import PlantInfo from "./PlantInfo";
import PlantHistoryPage from "./PlantHistoryPage";
import "../../compiled-icons/cancel";

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
      showModal: false,
    };
  },
  methods: {},
};
</script>

<style lang="scss">
@import "../../style/main-colors";
@import "../../style/main-style";


.info-icon-text{
  font-size: $standard-title-medium;
}

.plant-card {
  float: left;
  height: 16vh;
  width: 21.8%;
}

.plant-card-container {
  // width: 100%;
  margin-top: 1%;
}

.popup-container {
  // justify-content: center;
  // align-items: center;
  // width: 100%;
  // height: 50vh;
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
  background-color: rgba(250, 250, 250, 0.81);
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
  left: 5%;
  right: 5%;
  // transform: translate(-50%, -50%);
  z-index: 99;
  // height: 50%;
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
