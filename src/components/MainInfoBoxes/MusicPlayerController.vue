<template>
  <main>
    <div id="player">
      <div id="title-info-container">
        <div id="cover-img">
          <img id="album-cover" src="../../../public/img/album_cover.png" />
        </div>
        <div id="title-info">
          <div id="location">Lounge</div>
          <div id="title">Ok Cool.</div>
          <div id="artist">Yung Hurn - Album Name</div>
        </div>
        <!-- <div id="current-music-play-icon">
          <svgicon width="3vh" icon="music"></svgicon>
        </div> -->
      </div>
      <div id="duration-info">
        <div class="play-duration">1:25</div>
        <div id="progress-wrapper">
          <div id="progress"></div>
        </div>
        <div class="play-duration">3:30</div>
      </div>
      <div id="player-control">
        <svgicon class="play-icon" icon="player_control_plus"></svgicon>
        <svgicon class="play-icon" icon="player_control_backward"></svgicon>
        <svgicon
          class="play-icon"
          id="play"
          icon="player_control_play"
        ></svgicon>
        <svgicon class="play-icon" icon="player_control_forward"></svgicon>
        <svgicon class="play-icon" icon="player_control_more"></svgicon>
      </div>
    </div>
  </main>
</template>

<script>
import "../../compiled-icons/player_control_more";
import "../../compiled-icons/player_control_plus";
import "../../compiled-icons/player_control_backward";
import "../../compiled-icons/player_control_forward";
import "../../compiled-icons/player_control_pause";
import "../../compiled-icons/player_control_play";
import "../../compiled-icons/player_control_stop";
import "../../compiled-icons/music";

export default {
  name: "MusicPlayerController",
};
</script>

<style lang="scss">
#player {
  height: 100%;
  display: flexbox;
}

#player-control {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 0%;
  justify-content: center;
  height: 1.5vh;
}
#cover-img {
  align-self: flex-end;
}

#album-cover {
  border-radius: 15px;
  border: 0 solid grey;
  padding: 5%;
}
#title-info-container {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-column-gap: 5%;
  height: 50%;
}

#title-info {
  align-self: flex-end;
  padding-bottom: 5%;
}
#artist {
  font-size: 1vh;
}

#location {
  font-size: 0.8vh;
}
#duration-info {
  display: grid;
  grid-template-columns: 1fr 8fr 1fr;

  margin: 5% 0%;
}

.play-duration {
  font-size: 10px;
  justify-self: center;
}
#current-music-play-icon {
  justify-self: right;
}
#progress-wrapper {
  width: 100%;
  height: 3px;
  background-color: #ddd;
  border-radius: 10px;
  border: 0px solid;
  align-self: center;
}
#progress {
  width: 10%;
  border-radius: 10px;
  border: 0px solid;
  height: 3px;
  background-color: rgb(73, 157, 255);
}

.play-icon {
  height: 2.3vh;
  fill: lightgray;
  justify-self: center;
}

#play {
  fill: rgb(72, 72, 72);
}
</style>
