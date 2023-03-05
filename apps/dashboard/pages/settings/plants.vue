<script lang="ts" setup>
import { Plant } from '@nevo/domain-types'
import { nvButton } from '@nevo/ui'
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
    <div v-for="plant in plants">
      <NuxtLink class="plant-sensor-row" :to="`editPlant/${plant.id}`">
        <div class="plant-sensor-row-left">
          <div class="plant-sensor-row-name">{{ plant.name ?? 'Undefined' }}</div>
          <div class="plant-sensor-row-room">{{ plant.location?.name }}</div>
        </div>
        <div class="plant-sensor-row-right">
          <div class="plant-sensor-row-version">
            {{ plant.version }}
          </div>
        </div>
        <div class="plant-sensor-row-details-icon">〉</div>
      </NuxtLink>
    </div>

    <div id="add-new-plant-sensor-row"><NuxtLink to="addPlant">+ Add new Plant</NuxtLink></div>
  </div>
  <div class="empty-list-container" v-else>
    <div class="empty-list-info">
      <h3>No plants added yet</h3>
      <nv-button><NuxtLink to="addPlant">+ Add new Plant</NuxtLink></nv-button>
    </div>
  </div>
</template>

<style lang="scss">
@import '@nevo/style/variables.scss';

.plant-sensor-row {
  display: grid;
  grid-template-columns: 90% auto auto;
  padding: 0.3rem 1rem;

  text-decoration: none;
  color: $nevo-primary-text-color;

  .plant-sensor-row-left {
    .plant-sensor-row-room {
      font-size: small;
      color: $nevo-primary-text-color;
    }
  }

  .plant-sensor-row-right {
    justify-self: right;
    align-self: center;

    .plant-sensor-row-version {
      font-size: medium;
      color: $nevo-primary-text-color;
    }
  }

  .plant-sensor-row-details-icon {
    justify-self: right;
    align-self: center;
    color: $nevo-primary-text-color;
  }
}
#add-new-plant-sensor-row {
  display: grid;
  align-content: center;

  a {
    text-decoration: none;
    color: $nevo-primary-color-light;
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
