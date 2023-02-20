<template>
  <div class="settings-container">
    <Menu />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import Menu from './menu.vue'
</script>

<style lang="scss">
@import '../../../../packages/style/variables.scss';

.menu {
  border-radius: $standard-border-radius;
  padding: 15px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
}

.settings-container {
  display: grid;
  grid-template-columns: 20% auto;
  gap: 1rem;
}
</style>
