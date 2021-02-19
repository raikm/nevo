<template>
  <div class="basic-card scene-box">
    <svgicon class="scene-icon" :icon="sceneIcon"></svgicon>

    <h1 class="scene-name">
      {{ sceneName }}
    </h1>
  </div>
</template>

<script>
import "../../compiled-icons/login";
import "../../compiled-icons/logout";
import "../../compiled-icons/morning";
import "../../compiled-icons/projector";
import "../../compiled-icons/vacuum";
import "../../compiled-icons/moon";
import "../../compiled-icons/curtain";

export default {
  props: ["sceneIcon", "sceneName", "restPushMessage"],
};
</script>

<style lang="scss">
.scene-box {
  height: 2vw;
  max-height: 70px;
  margin-bottom: 15px;
  display: grid;
  grid-template-columns: 1fr 4fr;
  padding: 2% !important;
}

.scene-icon {
  //padding: 5;
  height: 70%;
  width: 70%;
  justify-self: center;
  align-self: center;
}

.scene-name {
  align-self: center;
  font-size: 100%;
  font-weight: 600;
}
</style>
