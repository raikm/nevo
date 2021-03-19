<template>
  <div class="basic-card main-info-box main-info-box-big music-control-box">
    <MusicPlayerController
      id="music-player"
      v-if="
        this.currentSelectedMainZone.length !== 0 &&
          this.currentSelectedMainZone.coordinator.state.playbackState ===
            'PLAYING'"
    />
    <MusicPlayerPlaylistController v-else id="music-control" />



    <!-- TODO: put more in the HorizontalBarController -->
    <div id="volume-control-wrapper">
      <HorizontalBarController
        id="volume-control"
        :value="
          this.currentSelectedMainZone.length !== 0
            ? this.currentSelectedMainZone.coordinator.state.volume
            : 0
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
  props: ["sliderValue"],
  computed: {
    ...mapGetters(["sonosZones", "config", "currentSelectedMainZone"]),
  },
  mounted() {
    this.setUpZones();
  },
  methods: {
    setUpZones() {
      this.$axios
        .get(this.config.sonos.RESTURL + "/zones")
        .then((response) => {
          this.$store.commit("setZones", response.data);
          this.setUpDefaultMainZones();
        })
        .catch((error) => {
          this.showToastError(error.toString());
        });
    },
    setUpDefaultMainZones() {
      const loungeZone = this.sonosZones.find((zone) => {
        return zone.coordinator.roomName === "Lounge";
      });
      if (typeof loungeZone === "undefined") return;
      if (
        this.currentSelectedMainZone.length === 0 ||
        this.currentMainZoneAvailable === false
      ) {
        this.$store.commit("setcurrentSelectedMainZone", loungeZone);
      }
    },
    currentMainZoneAvailable() {
      this.sonosZones.find((zone) => {
        if (
          zone.coordinator.roomName ===
          this.currentSelectedMainZone.coordinator.roomName
        )
          return true;
      });
      return false;
    },
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
  height: 100%;
}

#music-player {
  height: 75%;
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
