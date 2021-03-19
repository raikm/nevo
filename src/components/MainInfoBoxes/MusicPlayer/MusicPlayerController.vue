<template>
  <main>
    <div id="player" v-if="currentTrack.length !== 0">
      <div id="title-info-container">
        <div id="cover-img">
          <img id="album-cover" :src="currentTrack.albumArtUri" alt="" />
          <!-- TODO: ALT Cover -->
        </div>
        <div id="title-info">
          <div
            class="track-information-line"
            v-if="this.currentSelectedMainZone.length !== 0"
            id="location"
          >
            <p>{{ this.currentSelectedMainZone.coordinator.roomName }}</p>
          </div>
          <div class="track-information-line" id="title">
            <p>{{ currentTrack.title }}</p>
          </div>
          <div class="track-information-line" id="artist">
            <p>{{ currentTrack.artist }} - {{ currentTrack.album }}</p>
          </div>
        </div>
      </div>
      <div id="duration-info">
        <div class="play-duration">{{ elapsedTime }}</div>
        <div id="progress-track-wrapper">
          <div
            id="progress-track"
            v-if="this.currentSelectedMainZone.length !== 0"
            :style="{
              width:
                (this.currentSelectedMainZone.coordinator.state.elapsedTime /
                  this.currentTrack.duration) *
                  100 +
                '%',
            }"
          ></div>
        </div>
        <div class="play-duration">{{ endTrackTime }}</div>
      </div>
      <div id="player-control">
        <svgicon class="play-icon" icon="player_control_plus"></svgicon>
        <svgicon class="play-icon" icon="player_control_backward"></svgicon>
        <svgicon
          v-if="
            this.currentSelectedMainZone.length !== 0 &&
              this.currentSelectedMainZone.coordinator.state.playbackState ===
                'PLAYING'
          "
          class="play-icon"
          id="play"
          icon="player_control_pause"
        ></svgicon>
        <svgicon
          v-else
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
import "@/compiled-icons/player_control_more";
import "@/compiled-icons/player_control_plus";
import "@/compiled-icons/player_control_backward";
import "@/compiled-icons/player_control_forward";
import "@/compiled-icons/player_control_pause";
import "@/compiled-icons/player_control_play";
import "@/compiled-icons/player_control_stop";
import "@/compiled-icons/music";
import { mapGetters } from "vuex";

export default {
  name: "MusicPlayerController",
  computed: {
    ...mapGetters(["currentSelectedMainZone"]),
  },
  watch: {
    currentSelectedMainZone() {
      this.getCurrentTrack();
      this.elapsedTimeToFormatedString();
      this.endTimeToFormatedString();
    },
  },
  created() {
    this.getCurrentTrack();
    this.elapsedTimeToFormatedString();
    this.endTimeToFormatedString();
  },
  methods: {
    getCurrentTrack() {
      if (this.currentSelectedMainZone.length === 0) return;
      this.currentTrack = this.currentSelectedMainZone.members[0].state.currentTrack;
    },
    elapsedTimeToFormatedString() {
      const elapsedTimeInSeconds = this.currentSelectedMainZone.coordinator
        .state.elapsedTime;
      this.elapsedTime = this.timeInSecondsToTimes(elapsedTimeInSeconds);
    },
    endTimeToFormatedString() {
      const endTimeInSeconds = this.currentTrack.duration;
      this.endTrackTime = this.timeInSecondsToTimes(endTimeInSeconds);
    },
    timeInSecondsToTimes(seconds) {
      let defaultDate = new Date(0);
      defaultDate.setHours(0);
      defaultDate.setSeconds(seconds);
      const defaultDateString = defaultDate.toLocaleTimeString();
      if (defaultDateString.split(":")[1][0] === "0")
        return defaultDateString.slice(4, 8);
      return defaultDateString.slice(3, 8);
    },
    resumeTrack() {},
    pauseTrack() {},
    nextTrack() {},
    previousTrack() {},
  },
  data() {
    return {
      currentTrack: {},
      elapsedTime: "",
      endTrackTime: "",
    };
  },
};
</script>

<style lang="scss">
#player {
  height: 100%;
  display: flexbox;
}

.track-information-line p {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
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
  padding: 2%;
}
#title-info-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-column-gap: 5%;
  height: 45%;
}

#title-info {
  align-self: flex-end;
  padding-bottom: 5%;
  width: 100%;
}
#artist {
  font-size: 1vh;
  width: 100%;
  overflow: hidden;
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
#progress-track-wrapper {
  width: 90%;
  margin: 0 5%;
  height: 3px;
  background-color: #ddd;
  border-radius: 10px;
  border: 0px solid;
  align-self: center;
}
#progress-track {
  // width: 30%;
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
