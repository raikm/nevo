<template>
  <div class="standard-button button-w-icon">
    <div class="icon-wrapper">
      <svgicon class="icon-button" :icon="iconName" />
    </div>
    <div>{{ lableName }}</div>
  </div>
</template>

<script>
import "@/compiled-icons/apple_music";
import "@/compiled-icons/spotify";

export default {
  props: ["lableName", "iconName"],
};
</script>

<style lang="scss">
@import "./button-style.scss";

.button-w-icon {
  display: grid;
  grid-template-columns: 10% 80%;
  column-gap: 5%;
}
.icon-wrapper {
  display: grid;
  align-content: center;
}
.icon-button {
  justify-self: center;
  align-self: center;
  width: 100%;
  height: 100%;
  // color: inherit;
  // fill: none;
  // stroke: currentColor;
  
}
</style>
