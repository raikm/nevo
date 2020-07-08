<template>
  <div class="basic-card  main-info-box-big music-control-box">
    <MusicPlayerController id="music-control" />
    <HorizontalBarController id="volume-control" />
  </div>
</template>

<script>
import MusicPlayerController from "./MusicPlayerController";
import HorizontalBarController from "../InteractionController/HorizontalBarController";

export default {
  name: "MusicControlMainInfoBox",
  components: { MusicPlayerController, HorizontalBarController },
};
</script>

<style lang="scss">
.music-control-box {
  float: left;
  height: 25vh;
  margin: 1.6% 1.6%;
  
  width: 30%;
  background-color: white;
  border-radius: 10px;
  border-color: rgb(243, 244, 254);
  border-width: 1px;
  border-style: solid;
}

#music-control,
#volume-control {

}

#music-control {
  height: 70%;
  margin-bottom: 4%;
  // padding: 5%;
}

#volume-control {
  height: 5vh;
  width: 100%;
}
</style>
