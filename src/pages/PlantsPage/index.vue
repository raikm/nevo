<template>
  <div>
    <div id="header-plant-controller">
      <div id="plant-reload-container">
        <svgicon id="reload-icon" icon="reload" @click="reloadPlantData()" />
      </div>
    </div>
    <PlantCard :plantInformation="plantInformation" />
  </div>
</template>

<script>
import PlantCard from "./PlantCard";
import "../../compiled-icons/reload";

export default {
  name: "PlantsPage",
  components: {
    PlantCard,
  },
  created: function() {
    {
      this.getLastPlantData();
    }
  },
  data() {
    return {
      plantInformation: {},
    };
  },
  methods: {
    imagePath(image) {
      return require(image.url.default);
    },
    getLastPlantData() {
      this.$axios
        .get("http://192.168.1.80:8000/allplants/", {})
        .then((response) => {
          this.plantInformation = response.data;
        })
        .catch((error) => {
          this.showToastError(error.toString());
        });
    },
    reloadPlantData() {
      document.getElementById("reload-icon").setAttribute("class", "rotating");
      this.$axios
        .get("http://192.168.1.80:8000/reload_plant_data/", {})
        .then((response) => {
          this.plantInformation = response.data;
          document.getElementById("reload-icon").setAttribute("class", "");
        })
        .catch((error) => {
          this.showToastError(error.toString());
        });
    },
  },
};
</script>

<style lang="scss">
#header-plant-controller {
  display: grid;
}

#plant-reload-container {
  justify-self: right;
  height: 3vh;
  width: 3vh;
  padding: 0, 5vh;
  display: grid;
  place-items: center;
  #reload-icon {
    height: 2vh;
    fill: rgb(64, 64, 64);
    transition: transform 1s ease-in-out;
  }
}

@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
  to {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
}
.rotating {
  -webkit-animation: rotating 1s linear infinite;
  -moz-animation: rotating 1s linear infinite;
  -ms-animation: rotating 1s linear infinite;
  -o-animation: rotating 1s linear infinite;
  animation: rotating 1s linear infinite;
}

#plant-reload-container:hover {
  background-color: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(10px);
  border-width: 0;
  border-radius: 10px;
  border-style: solid;
  cursor: none;
}
</style>
