<template>
  <main>
    <svgicon class="scene-icon-2" :icon="scene.iconSource"></svgicon>

    <h1 class="scene-name-2">
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
  props: ["scene", "containerWidth"],
};
</script>

<style lang="scss">
.scene-icon-2 {
  height: 2.5vh;
  width: 2.5vw;
}

.scene-name-2 {
  margin-right: 1vh;
  float: right;
  font-size: large;
  font-weight: 500;
}
</style>
