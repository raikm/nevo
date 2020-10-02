<template>
  <main>
    <svgicon class="scene-icon" :icon="scene.iconSource"></svgicon>

    <h1 class="scene-name" :scene="scene">
      {{ scene.title }}
    </h1>
  </main>
</template>

<script>
//npm run generate-icons
import "../../compiled-icons/login";
import "../../compiled-icons/logout";
import "../../compiled-icons/morning";
import "../../compiled-icons/projector";
import "../../compiled-icons/vacuum";
import "../../compiled-icons/moon";
import "../../compiled-icons/curtain";

export default {
  name: "StandardSceneBox",
  props: ["scene"],
};
</script>

<style lang="scss">
.scene-icon {
  height: 2.5vh;
  width: 2.5vw;
}

.scene-name {
  margin-right: 1vh;
  float: right;
  font-size: large;
  font-weight: 500;
}
</style>
