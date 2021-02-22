<template>
  <div>
    <div class="page-header">
      <div
        :v-if="humiditySensors"
        :key="humditySensor.entity_id"
        v-for="humditySensor in humiditySensors"
      >
        <HeaderInfoBoxWithIcon
          :iconName="'office'"
          :headerValue="
            humditySensor.state != 'unavailable'
              ? humditySensor.state + '%'
              : humditySensor.state
          "
        />
      </div>
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
import HeaderInfoBoxWithIcon from "../../components/HeaderInfoBox/HeaderInfoBoxWithIcon";
import { mapState } from "vuex";

export default {
  components: {
    PlantCard,
    HeaderInfoBoxWithIcon,
  },
  created() {
    {
      this.getLastPlantData();
      this.saveCurrentHumiditySensorDate();
    }
  },
  computed: mapState(["currentEntities"]),
  watch: {
    currentEntities() {
      this.saveCurrentHumiditySensorDate();
    },
  },
  data() {
    return {
      plantInformation: {},
      humiditySensors: [],
    };
  },
  methods: {
    saveCurrentHumiditySensorDate() {
      this.humiditySensors = [];
      this.$store.getters.getCurrentEntities.filter((entity) => {
        if (entity.entity_id.startsWith("sensor.humidity")) {
          console.log(entity);
          this.humiditySensors.push(entity);
        }
        // console.log(this.humiditySensors);
      });
    },
    imagePath(image) {
      return require(image.url.default);
    },
    getLastPlantData() {
      this.$axios
        .get(this.$store.getters.getConfig.homeserver.url + ":8080/getAllPlants/", {})
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
        .get(this.$store.getters.getConfig.homeserver.url + ":8080/reload_plant_data/", {})
        .then((response) => {
          // console.log(response);
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
@import "../../style/main-colors";

#plant-page {
  height: 100%;
}

#plant-reload-container {
  height: 2rem;
  width: 2rem;
  // padding: 0, 5vh;
  display: grid;
  place-items: center;
  #reload-icon {
    height: 1.5rem;
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

.info-bar-fertilizer {
  background-color: $main-green;
}

.info-bar-moisture {
  background-color: $main-blue;
}

.info-bar-sun {
  background-color: $main-yellow;
}
</style>
