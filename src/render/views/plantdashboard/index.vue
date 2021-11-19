<template>
  <div>
    <PlantCards :plantInformation="plantInformation" />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

import PlantCards from "./PlantCards.vue";

import { Plant } from "../../types/plant.interface";
import { useStore } from "vuex";
import axios from "axios";

export default defineComponent({
  components: { PlantCards },
  setup() {
    const store = useStore()
    let plantInformation = ref({} as Plant[])

    const getLastPlantData = () => {
      axios
        .get(
          store.state.config.homeserver.url + ":8080/getLatestPlantUpdates/"
        )
        .then((response: any) => {
          plantInformation.value = response.data;
        })
        .catch((error: Error) => {
          console.log(error.message.toString());
        });
    }
    getLastPlantData();
    return {
      plantInformation,
    }
  }
});

</script>

<style lang="scss">
//
</style>
