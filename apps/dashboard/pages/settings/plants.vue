<script lang="ts" setup>
import { Plant } from '@nevo/domain-types'
import { ref } from 'vue'

const plants = ref<Plant[]>([
  {
    id: '1',
    name: 'Strelizia',
    address: 'addre',
    version: '2.0.0',
    location: {
      name: 'Bedroom',
      id: '1',
      floor: 2
    }
  },
  {
    id: '2',
    name: 'Monstera',
    address: 'addr',
    version: '1.0.0'
  }
])
</script>

<template>
  <div class="plants-list-container">
    <div class="plant-row" v-for="plant in plants">
      <div class="plant-row-left">
        <div class="plant-row-name">{{ plant.name }}</div>
        <div class="plant-row-room">{{ plant.location?.name }}</div>
      </div>
      <div class="plant-row-right">
        <div class="plant-row-version">
          {{ plant.version }}
        </div>
      </div>
      <div class="plant-row-details-icon">〉</div>
    </div>

    <div id="add-new-plant-row"><NuxtLink to="addPlant">+ Add new Plant</NuxtLink></div>
  </div>
</template>

<style lang="scss">
.plants-list-container {
  padding: 0.8rem;
  border-radius: 15px;
  background-color: white;
}

.plants-list-container > div {
  border-bottom: 1px solid lightgray;
  padding-left: 15px;
  height: 4vh;
}
.plants-list-container > div:last-child {
  border: none;
}

.plant-row {
  display: grid;
  grid-template-columns: 90% auto auto;
  padding: 0.3rem 1rem;
  .plant-row-left {
    .plant-row-room {
      font-size: small;
      color: rgb(115, 115, 115);
    }
  }
  .plant-row-right {
    justify-self: right;
    align-self: center;

    .plant-row-version {
      font-size: medium;
      color: rgba(115, 115, 115, 0.615);
    }
  }

  .plant-row-details-icon {
    justify-self: right;
    align-self: center;
    color: rgba(115, 115, 115, 0.615);
  }
}

#add-new-plant-row {
  display: grid;
  align-content: center;

  a {
    text-decoration: none;
    color: #9604ff8a;
  }
}
</style>
