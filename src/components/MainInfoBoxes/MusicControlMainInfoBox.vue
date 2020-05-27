<template>
  <div class="music-control-box">
    <MusicPlayerController id="music-control" />
    <VolumeController id="volume-control" />
  </div>
</template>

<script>
import MusicPlayerController from "./MusicPlayerController";
import VolumeController from "./VolumeController";

export default {
  name: "MusicControlMainInfoBox",
  components: { MusicPlayerController, VolumeController },
};
</script>

<style lang="scss">
.music-control-box {
  float: left;
  height: 25vh;
  margin: 1.6% 1.6%;
  
  width: 30%;
}

#music-control,
#volume-control {
  box-shadow: 0 1px 2px 0;
  border-radius: 10px;
}

#music-control {
  height: 70%;
  margin-bottom: 5%;
}

#volume-control {
  height: 6vh;
  padding: 1.6%;
}
</style>
