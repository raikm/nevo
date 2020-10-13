<template>
  <div class="basic-card main-info-box main-info-box-big music-control-box">
    <MusicPlayerPlaylistController id="music-control" />
    <MusicPlayerController id="music-player" />
    <!-- v-model="value" under -->
    <div id="volume-control-wrapper">
      <HorizontalBarController id="volume-control" />
      <div id="volume-icon-container">
        <svgicon id="volume-icon" icon="volume_medium"></svgicon>
      </div>
    </div>
  </div>
</template>

<script>
import MusicPlayerPlaylistController from "./MusicPlayerPlaylistController";
import MusicPlayerController from "./MusicPlayerController";
import HorizontalBarController from "../InteractionController/HorizontalBarController";
import "../../compiled-icons/volume_medium";

export default {
  name: "MusicControlMainInfoBox",
  components: {
    MusicPlayerPlaylistController,
    HorizontalBarController,
    MusicPlayerController,
  },
  props: ["sliderValue"],
  data() {
    return {};
  },
};
</script>

<style lang="scss">
#volume-control::-webkit-slider-thumb {
  -webkit-appearance: none;
  -webkit-touch-appearance: none;
  width: 0px; /* 1 */
  background: #fff;
  box-shadow: -100vw 0 0 100vw #ffffff;
}

.music-control-box {
  float: left;
  height: 70%;

  background-color: white;
  border-radius: 10px;
  border-color: rgb(243, 244, 254);
  border-width: 1px;
  border-style: solid;
  display: flex;
  flex-direction: column;
}

#music-control,
#volume-control {
}

#music-player {
  height: 70%;
  margin-bottom: 4%;
}

#music-control {
  
  margin-bottom: 4%;
  display: none;
  // padding: 5%;
}

#volume-control-wrapper {
  height: 30%;
  position: relative;
  
}
#volume-icon-container {
  height: 100%;
  position: absolute;
  z-index: 99;
  pointer-events: none;
}
#volume-icon {
  height: 3vh;
  margin: 1vh;
  fill: lightgray;
}

#volume-control {
  position: absolute;
  z-index: 98;
  height: 5vh;
  width: 100%;
}
</style>
