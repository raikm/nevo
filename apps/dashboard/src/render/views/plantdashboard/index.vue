<template>
  <div>
    <PlantCards :plantInformation="plantInformation" />
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { Plant } from '../../types/plant.interface'
import PlantCards from './PlantCards.vue'

const store = useStore()
let plantInformation = ref({} as Plant[])

const getLastPlantData = () => {
  axios
    .get(store.state.config.homeserver.url + ':8080/getLatestPlantUpdates/')
    .then((response: any) => {
      plantInformation.value = response.data
    })
    .catch((error: Error) => {
      console.log(error.message.toString())
    })
}
getLastPlantData()
</script>

<style lang="scss">
//
</style>
