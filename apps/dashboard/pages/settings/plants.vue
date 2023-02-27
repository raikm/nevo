<script lang="ts" setup>
import { Plant } from '@nevo/domain-types'
import { ref } from 'vue'
import { usePlantService } from '~~/services/plant'

const plantService = usePlantService()
const plants = ref<Plant[]>([])

onMounted(async () => {
  plants.value = await plantService.getAll()
})
</script>

<template>
  <div v-if="plants.length > 0" class="plants-sensor-list-container">
    <div class="plant-sensor-row" v-for="plant in plants">
      <NuxtLink :to="`editPlant/${plant.id}`">
        <div class="plant-sensor-row-left">
          <div class="plant-sensor-row-name">{{ plant.name ?? 'Undefined' }}</div>
          <div class="plant-sensor-row-room">{{ plant.location?.name }}</div>
        </div>
      </NuxtLink>
      <div class="plant-sensor-row-right">
        <div class="plant-sensor-row-version">
          {{ plant.version }}
        </div>
      </div>
      <div class="plant-sensor-row-details-icon">〉</div>
    </div>

    <div id="add-new-plant-sensor-row"><NuxtLink to="addPlant">+ Add new Plant</NuxtLink></div>
  </div>
  <div class="empty-list-container" v-else>
    <div class="empty-list-info">
      <h3>No plants added yet</h3>
      <button><NuxtLink to="addPlant">+ Add new Plant</NuxtLink></button>
    </div>
  </div>
</template>

<style lang="scss">
#add-new-plant-sensor-row {
  display: grid;
  align-content: center;

  a {
    text-decoration: none;
    color: #9604ff8a;
  }
}

.empty-list-container {
  display: grid;
  height: 100%;
  place-items: center;
}

.empty-list-info {
  display: grid;
  place-items: center;
}
</style>
