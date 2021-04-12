<template>
  <div>
    <div
      class="basic-card click-element"
      :key="shortcut.index"
      v-for="shortcut in this.$store.getters.shortcutEntities"
    >
      <StandardSceneBox :containerWidth="containerWidth" :shortcut="shortcut" />
    </div>
  </div>
</template>

<script>
import StandardSceneBox from "./StandardSceneBox";

export default {
  name: "MainSceneBox",
  props: ["containerWidth"],
  components: { StandardSceneBox },
};
</script>

<style lang="scss">
.scene-button {
  width: 10vw;
}
</style>
