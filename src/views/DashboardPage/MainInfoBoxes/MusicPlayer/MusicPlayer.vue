<template>
  <div class="player-wrapper" v-if="currentTrack.length !== 0">
    <div id="player">
      <div id="title-info-container">
        <div id="cover-img">
          <img
            id="album-cover"
            :src="currentTrack.absoluteAlbumArtUri"
            alt=""
          />
        </div>
        <div id="title-info">
          <div class="track-information-line" id="location">
            <p>{{ activeSpeakerNames }}</p>
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
        <!-- <div class="play-duration">{{ currentTrackSecondsString }}</div> -->
        <div id="progress-track-wrapper">
          <div
            id="progress-track"
            :style="{
              width:
                (this.currentTrackSeconds / this.currentTrack.duration) * 100 +
                '%',
            }"
          ></div>
        </div>
        <!-- <div class="play-duration">{{ endTrackTime }}</div> -->
      </div>

      <div id="player-control">
        <div id="playlist-icon" @click="$emit('showPlaylists')">☰</div>
        <svgicon
          class="play-icon"
          icon="player_control_backward"
          :class="activeGroup == null ? 'player-icon-inactive' : ''"
          @click="previousTrack"
        ></svgicon>

        <svgicon
          v-if="currentPlaybackState === 'PLAYING'"
          class="play-icon"
          id="play"
          icon="player_control_pause"
          @click="pauseMusic"
        ></svgicon>
        <svgicon
          v-else
          class="play-icon"
          id="play"
          icon="player_control_play"
          @click="resumeMusic"
        ></svgicon>

        <svgicon
          class="play-icon"
          :class="activeGroup == null ? 'player-icon-inactive' : ''"
          icon="player_control_forward"
          @click="nextTrack"
        ></svgicon>
        <svgicon
          class="speaker-icon"
          icon="sonos_speaker"
          @click="showSpeaker"
        ></svgicon>
      </div>
      <div
        v-if="this.activeGroup || this.latestActiveGroup"
        id="volume-control-wrapper"
      >
        <HorizontalBarController
          ref="volumeControl"
          id="volume-control"
          @change-slider-value="changeVolume"
          :value="
            this.activeGroup != null
              ? this.activeGroup.coordinator.state.volume
              : this.latestActiveGroup.coordinator.state.volume
          "
        />
        <div id="volume-icon-container">
          <svgicon id="volume-icon" icon="volume_medium"></svgicon>
        </div>
      </div>
    </div>
    <Speaker
      v-if="currentTrack.length !== 0"
      id="speakers"
      @hideSpeaker="hideSpeaker"
      @changeVolume="changeVolume"
    />
  </div>
</template>

<script>
import "@/compiled-icons/player_control_more";
import "@/compiled-icons/player_control_plus";
import "@/compiled-icons/player_control_backward";
import "@/compiled-icons/player_control_forward";
import "@/compiled-icons/player_control_pause";
import "@/compiled-icons/player_control_play";
import "@/compiled-icons/player_control_stop";
import "@/compiled-icons/sonos_speaker";
import { mapGetters, mapState } from "vuex";
import HorizontalBarController from "@/components/Inputs/HorizontalBarController";
import Speaker from "./Speaker";

export default {
  name: "MusicPlayer",
  computed: {
    ...mapGetters(["activeGroupState", "config"]),
    ...mapState(["activeGroup"]),
  },
  components: { HorizontalBarController, Speaker },
  data() {
    return {
      currentTrackSeconds: 0,
      currentTrackSecondsString: "",
      currentPlaybackState: "",
      currentTrack: {},
      elapsedTime: "",
      endTrackTime: "",
      activeSpeakerNames: "",
      latestActiveGroup: {},
    };
  },
  created() {
    this.getChanges();
    if (
      this.activeGroup != null &&
      this.activeGroupState.playbackState === "PLAYING"
    ) {
      this.setupPlayer();
    }
  },
  watch: {
    activeGroup() {
      if (
        this.activeGroup != null &&
        this.activeGroupState.playbackState === "PLAYING"
      ) {
        this.setupPlayer();
      } else if (this.latestActiveGroup != null) {
        this.setupCachePlayer();
      }
    },
  },
  sockets: {},
  mounted() {
    this.interval = setInterval(() => {
      this.updateSecondsInCurrentTrack();
    }, 1000);
  },
  unmounted() {
    clearInterval(this.interval);
  },
  methods: {
    updateSecondsInCurrentTrack() {
      this.currentTrackSeconds += 1;
      // this.elapsedTimeToFormatedString(this.currentTrackSeconds);
    },
    setupPlayer() {
      this.activeRoomNames();
      this.currentPlaybackState = "PLAYING";
      this.currentTrackSeconds = this.activeGroupState.elapsedTime;
      this.currentTrack = this.activeGroupState.currentTrack;
      this.latestActiveGroup = this.activeGroup;
    },
    setupCachePlayer() {
      this.currentTrack = this.latestActiveGroup.coordinator.state.currentTrack;
      this.currentPlaybackState = "PAUSED";
      clearInterval(this.interval);
    },

    // elapsedTimeToFormatedString() {
    //   this.currentTrackSecondsString = this.getFormatedTimeString(
    //     this.currentTrackSeconds
    //   );
    // },
    // endTimeToFormatedString({ duration: endTimeInSeconds }) {
    //   this.endTrackTime = this.getFormatedTimeString(endTimeInSeconds);
    // },
    // getFormatedTimeString(seconds) {
    //   let durationTime = new Date(0);
    //   durationTime.setHours(0);
    //   durationTime.setSeconds(seconds);
    //   const durationTimeString = durationTime.toLocaleTimeString();
    //   if (durationTimeString.split(":")[1][0] === "0")
    //     return durationTimeString.slice(4, 8);
    //   return durationTimeString.slice(3, 8);
    // },
    resumeMusic() {
      let roomName =
        this.activeGroup != null
          ? this.activeGroup.coordinator.roomName
          : this.latestActiveGroup.coordinator.roomName;

      this.axios
        .get(`${this.config.sonos.rest_url}/${roomName}/play`)
        .then((this.currentPlaybackState = "PLAYING"))
        .catch((error) => {
          this.showToastError(error.toString());
        });
    },
    pauseMusic() {
      this.axios
        .get(
          `${this.config.sonos.rest_url}/${this.activeGroup.coordinator.roomName}/pause`
        )
        .catch((error) => {
          this.showToastError(error.toString());
        });
    },
    nextTrack() {
      this.axios
        .get(
          `${this.config.sonos.rest_url}/${this.activeGroup.coordinator.roomName}/next`
        )
        .then()
        .catch((error) => {
          this.showToastError(error.toString());
        });
    },
    previousTrack() {
      this.axios
        .get(
          `${this.config.sonos.rest_url}/${this.activeGroup.coordinator.roomName}/previous`
        )
        .then()
        .catch((error) => {
          this.showToastError(error.toString());
        });
    },
    getChanges() {
      this.sockets.subscribe("change", (data) => {
        let result = JSON.parse(data.toString());
        if (result.type === "transport-state") {
          // this.$store.commit("updateSpeakers", result.data);
          this.axios
            .get(this.config.sonos.rest_url + "/zones")
            .then((response) => {
              this.$store.commit("setSpeakers", response.data);
            })
            .catch((error) => {
              this.showToastError(error.toString());
            });
        }
        if (result.type === "topology-change") {
          this.$store.commit("setSpeakers", result.data);
        }
        if (result.type === "volume-change") {
          this.$store.commit("setNewSpeakerVolume", result.data);
        }
      });
    },
    showSpeaker() {
      document.getElementById("player").style.display = "none";
      document.getElementById("speakers").style.display = "grid";
    },
    hideSpeaker() {
      document.getElementById("player").style.display = "grid";
      document.getElementById("speakers").style.display = "none";
    },
  
    activeRoomNames() {
      // let result = activeGroup.forEach(obj => obj.members.roomName + ", ")
      let result = "";
      for (
        let index = 0;
        index < this.activeGroup.members.length - 1;
        index++
      ) {
        result += this.activeGroup.members[index].roomName + ", ";
      }
      result += this.activeGroup.members[this.activeGroup.members.length - 1]
        .roomName;
      this.activeSpeakerNames = result;
    },
    changeVolume(newVolume) {
      this.axios
        .get(
          `${this.config.sonos.rest_url}/${this.activeGroup.coordinator.roomName}/groupVolume/${newVolume}`
        )
        .catch((error) => {
          this.showToastError(error.toString());
        });
    },
  },
};
</script>

<style lang="scss">
.player-wrapper{
  // height: 100%;
  // overflow: hidden;
}

#player {
  height: 100%;
  display: grid;
  grid-template-rows: 42% 10% 19% 20%;
  row-gap: 2%;
}
#speakers {
  height: 100%;
  display: none;
  grid-template-rows: 65% 20% 15%;
  row-gap: 2%;
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
}
#cover-img {
  // align-self: flex-end;
}

#album-cover {
  // border-radius: 15px;
  height: 100%;
  width: 100%;
}
#title-info-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-column-gap: 5%;
  // height: 100%;
  // width: 100%;
  overflow: hidden;
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
  width: 100%;
  // grid-template-columns: 1fr 8fr 1fr;

  // margin: 5% 0%;
}

.play-duration {
  font-size: 10px;
  justify-self: center;
  align-self: center;
}
#current-music-play-icon {
  justify-self: right;
}
#progress-track-wrapper {
  width: 100%;
  // margin: 0 5%;
  height: 3px;
  background-color: #ddd;
  border-radius: 10px;
  border: 0px solid;
  align-self: center;
}
#progress-track {
  max-width: 100%;
  border-radius: 10px;
  border: 0px solid;
  height: 3px;
  background-color: rgb(73, 157, 255);
}

.play-icon {
  height: 50%;
  fill: rgb(72, 72, 72);
  justify-self: center;
  align-self: center;
}
.speaker-icon {
  height: 65%;
  justify-self: center;
  align-self: center;
}

.speaker-icon-small {
  height: 1.5vh;
  justify-self: center;
  align-self: center;
}

#play {
  fill: rgb(72, 72, 72);
}

#playlist-icon {
  justify-self: center;
  align-self: center;
  font-size: 140%;
  color: rgb(72, 72, 72);
}

#volume-control-wrapper {
  // max-height: 10vh;
  position: relative;
}

#volume-icon-container {
  height: 100%;
  position: absolute;
  z-index: 99;
  pointer-events: none;
}
#volume-icon {
  // height: 2vh;
  margin: 1.5vh;
  fill: lightgray;
}

#volume-control {
  position: absolute;
  z-index: 98;
  height: 100%;
  width: 100%;
}

.player-icon-inactive {
  pointer-events: none;
  fill: rgba(72, 72, 72, 0.459);
}
</style>
