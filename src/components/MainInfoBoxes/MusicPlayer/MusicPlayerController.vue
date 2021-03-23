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
            v-if="this.activeSpeaker.length !== 0"
            id="location"
          >
            <p>{{ this.activeSpeaker.roomName }}</p>
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
        <div class="play-duration">{{ currentTrackSecondsString }}</div>
        <div id="progress-track-wrapper">
          <div
            id="progress-track"
            v-if="this.activeSpeaker.length !== 0"
            :style="{
              width:
                (this.currentTrackSeconds / this.currentTrack.duration) * 100 +
                '%',
            }"
          ></div>
        </div>
        <div class="play-duration">{{ endTrackTime }}</div>
      </div>
      <div id="player-control">
        <!-- <svgicon class="play-icon" icon="player_control_plus"></svgicon> -->
        <div></div>
        <svgicon
          class="play-icon"
          icon="player_control_backward"
          @click="previousTrack()"
        ></svgicon>
        <!-- Pause Button -->
        <svgicon
          v-if="
            this.activeSpeaker.length !== 0 &&
              this.activeSpeakerState.playbackState === 'PLAYING'
          "
          class="play-icon"
          id="play"
          icon="player_control_pause"
          @click="pauseMusic()"
        ></svgicon>
        <!-- Play Button -->
        <svgicon
          v-else
          class="play-icon"
          id="play"
          icon="player_control_play"
          @click="resumeAll()"
        ></svgicon>

        <svgicon
          class="play-icon"
          icon="player_control_forward"
          @click="nextTrack()"
        ></svgicon>
        <div></div>
        <!-- <svgicon class="play-icon" icon="player_control_more"></svgicon> -->
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
    ...mapGetters(["activeSpeaker", "activeSpeakerState", "config"]),
  },
  data() {
    return {
      currentTrackSeconds: 0,
      currentTrackSecondsString: "",
      currentTrack: {},
      elapsedTime: "",
      endTrackTime: "",
    };
  },
  created() {
    this.getCurrentTrack();
    if (this.activeSpeaker.length !== 0 && this.currentTrack.length !== 0) {
      // console.log(this.activeSpeakerState)
      this.currentTrackSeconds = this.activeSpeakerState.elapsedTime;

      this.endTimeToFormatedString(this.currentTrack);
    }
    this.getChanges();
  },
  watch: {
    activeSpeaker() {
      if (this.activeSpeaker.length === 0) {
        clearInterval(this.interval);
        return;
      }
      this.getCurrentTrack();
      if (this.currentTrack.length !== 0) {
        this.currentTrackSeconds = this.activeSpeakerState.elapsedTime;
        this.endTimeToFormatedString(this.currentTrack);
      }
    },
  },
  sockets: {},
  mounted() {
    if (
      typeof this.activeSpeakerState !== "undefined" &&
      this.activeSpeakerState.playbackState === "PLAYING"
    ) {
      this.interval = setInterval(() => {
        this.updateSecondsInCurrentTrack();
      }, 1000);
    }
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    updateSecondsInCurrentTrack() {
      this.currentTrackSeconds += 1;
      this.elapsedTimeToFormatedString(this.currentTrackSeconds);
    },
    getCurrentTrack() {
      this.currentTrack =
        this.activeSpeaker.length !== 0
          ? this.activeSpeakerState.currentTrack
          : {};
    },
    elapsedTimeToFormatedString() {
      this.currentTrackSecondsString = this.getFormatedTimeString(
        this.currentTrackSeconds
      );
    },
    endTimeToFormatedString({ duration: endTimeInSeconds }) {
      this.endTrackTime = this.getFormatedTimeString(endTimeInSeconds);
    },
    getFormatedTimeString(seconds) {
      let durationTime = new Date(0);
      durationTime.setHours(0);
      durationTime.setSeconds(seconds);
      const durationTimeString = durationTime.toLocaleTimeString();
      if (durationTimeString.split(":")[1][0] === "0")
        return durationTimeString.slice(4, 8);
      return durationTimeString.slice(3, 8);
    },
    resumeAll() {
      this.$axios
        .get(
          `${this.config.sonos.rest_url}/${this.activeSpeaker.roomName}/play`
        )
        .then((this.activeSpeakerState.playbackState = "PLAYING"))
        .catch((error) => {
          this.showToastError(error.toString());
        });
    },
    pauseMusic() {
      this.$axios
        .get(
          `${this.config.sonos.rest_url}/${this.activeSpeaker.roomName}/pause`
        )
        .then((this.activeSpeakerState.playbackState = "PAUSED"))
        .catch((error) => {
          this.showToastError(error.toString());
        });
    },
    nextTrack() {
      this.$axios
        .get(
          `${this.config.sonos.rest_url}/${this.activeSpeaker.roomName}/next`
        )
        .then()
        .catch((error) => {
          this.showToastError(error.toString());
        });
    },
    previousTrack() {
      this.$axios
        .get(
          `${this.config.sonos.rest_url}/${this.activeSpeaker.roomName}/previous`
        )
        .then()
        .catch((error) => {
          this.showToastError(error.toString());
        });
    },
    getChanges() {
      this.sockets.subscribe("change", (data) => {
        let result = JSON.parse(data.toString());
        console.log(result);
        if (result.type === "transport-state") {
          this.$store.commit("updateSpeakers", result.data);
        }
        if (result.type === "topology-change") {
          this.$store.commit("setSpeakers", result.data);
        }
        if (result.type === "volume-change") {
          this.$store.commit("setNewSpeakerVolume", result.data);
        }
      });
    },
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
  // border-radius: 15px;

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
