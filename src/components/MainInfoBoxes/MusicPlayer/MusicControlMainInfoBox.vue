// v-if=" // this.activeSpeaker.length !== 0 && //
(this.activeSpeakerState.playbackState === 'PLAYING' || //
this.activeSpeakerState.playbackState === 'PAUSED') // "

<template>
  <div class="basic-card main-info-box main-info-box-big music-control-box">
    <MusicPlayerController
      v-if="this.activeSpeaker.length !== 0"
      id="music-player"
    />
    <MusicPlayerPlaylistController
      v-if="
        this.activeSpeaker.length === 0
      "
      id="music-control"
    />

    <!-- TODO: put more in the HorizontalBarController -->
    <div id="volume-control-wrapper">
      <HorizontalBarController
        ref="volumeControl"
        id="volume-control"
        @change-slider-value="changeVolume"
        :value="
          this.activeSpeaker.length !== 0 ? this.activeSpeakerState.volume : 0
        "
      />
      <div id="volume-icon-container">
        <svgicon id="volume-icon" icon="volume_medium"></svgicon>
      </div>
    </div>
  </div>
</template>

<script>
import MusicPlayerPlaylistController from "./MusicPlayerPlaylistController";
import MusicPlayerController from "./MusicPlayerController";
import HorizontalBarController from "@/components/InteractionController/HorizontalBarController";
import "../../../compiled-icons/volume_medium";
import { mapGetters } from "vuex";

export default {
  name: "MusicControlMainInfoBox",
  components: {
    MusicPlayerPlaylistController,
    HorizontalBarController,
    MusicPlayerController,
  },
  computed: {
    ...mapGetters([
      "speakers",
      "config",
      "activeSpeaker",
      "activeSpeakerState",
    ]),
  },
  mounted() {
    this.setUpZones();
  },
  methods: {
    setUpZones() {
      if (this.config.sonos.rest_url === "<IP_ADDRESS>") return;
      this.$axios
        .get(this.config.sonos.rest_url + "/zones")
        .then((response) => {
          this.$store.commit(
            "setSpeakers",
            response.data.map((element) => element.coordinator)
          );
          // this.setUpDefaultMainZones();
        })
        .catch((error) => {
          this.showToastError(error.toString());
        });
    },
    // setUpDefaultMainZones() {
    //   const loungeZone = this.speakers.find((zone) => {
    //     return zone.coordinator.roomName === "Lounge";
    //   });
    //   if (typeof loungeZone == null) return;
    //   if (
    //     this.activeSpeaker.length === 0 ||
    //     this.currentMainZoneAvailable === false
    //   ) {
    //     this.$store.commit("setActiveSpeakers", loungeZone);
    //   }
    // },
    currentMainZoneAvailable() {
      this.speakers.find((zone) => {
        if (zone.coordinator.roomName === this.activeSpeaker.roomName)
          return true;
      });
      return false;
    },
    changeVolume(newVolume) {
      this.$axios
        .get(
          `${this.config.sonos.rest_url}/${this.activeSpeaker.roomName}/volume/${newVolume}`
        )
        .catch((error) => {
          this.showToastError(error.toString());
        });
    },
  },
};
</script>

<style lang="scss">
#volume-control::-webkit-slider-thumb {
  -webkit-appearance: none;
  -webkit-touch-appearance: none;
  width: 0px;
  // color: #fff;
  //  border: 0 !important;
  //  background-color:#fff !important;
  background-color: #fff;
  box-shadow: -100vw 0 0 100vw #ffffff;
  cursor: none;
}

.music-control-box {
  height: 100%;
  width: 100%;
}

#music-player,
#music-control {
  height: 75%;
  width: 100%;
}

#volume-control-wrapper {
  height: 25%;

  position: relative;
}
#volume-icon-container {
  height: 100%;
  position: absolute;
  z-index: 99;
  pointer-events: none;
}
#volume-icon {
  height: 2vh;
  margin: 1.5vh;
  fill: lightgray;
}

#volume-control {
  position: absolute;
  z-index: 98;
  height: 5vh;
  width: 100%;
}
</style>
