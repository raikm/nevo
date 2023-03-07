<template>
  <div id="plants-wrapper">
    <h3>Living Room</h3>
    <div class="plants-per-room">
      <PlantCard />
      <PlantCard />
      <PlantCard />
      <PlantCard />
      <PlantCard />
      <PlantCard />
      <PlantCard />
      <PlantCard />
      <PlantCard />
      <PlantCard />
    </div>
  </div>
</template>

<script lang="ts" setup>
import PlantCard from './PlantCard.vue'
</script>

<style lang="scss">
@import '@nevo/style/variables.scss';
.plants-per-room {
  display: flex;
  gap: $box-gap;
  flex-wrap: wrap;
}
</style>
