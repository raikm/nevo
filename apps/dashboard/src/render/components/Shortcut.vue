<template>
  <div class="shortcut-pill" @click="triggerShortcut">
    <span>{{ shortcut.attributes.friendly_name }}</span>
  </div>
</template>


<script lang="ts" setup>
import { HassEntityBase } from 'home-assistant-js-websocket';



defineProps<{
  shortcut: HassEntityBase
}>()

</script>


<style lang="scss">
@import "../../../../../libs/style/mainstyle.scss";

.shortcut-pill {
  margin: $standard-space 1px;
  border-radius: 99px;
  height: 2rem;
  display: grid;
  place-items: center;
  font-size: 0.8rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  backdrop-filter: saturate(130%) blur(20px);
}
</style>
