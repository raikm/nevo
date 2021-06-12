<template>
  <div>
    <div id="speakergroup-wrapper">
      <div
        class="speakergroup"
        :key="speaker.uuid"
        v-for="speaker in this.speakers"
      >
        <div class="volume-speaker"></div>
        <div
          :class="
            speaker.state.playbackState === 'PLAYING'
              ? 'active-speaker'
              : 'inactive-speaker'
          "
          class="speaker-element"
          @click="changeState(speaker)"
        >
          <svgicon class="speaker-icon-small" icon="sonos_speaker"></svgicon>
          <div class="speaker-element-name">{{ speaker.roomName }}</div>
        </div>
      </div>
    </div>
    <div id="volume-control-wrapper">
      <HorizontalBarController
        ref="volumeControl"
        id="volume-control"
        @change-slider-value="$emit('changeVolume')"
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
    <div
      v-if="this.activeGroupState != null"
      @click="$emit('hideSpeaker')"
      class="current-song-wrapper"
    >
      <CurrentSongPreview :currentTrack="this.activeGroupState.currentTrack" />
    </div>
  </div>
</template>

<script>
import CurrentSongPreview from "./CurrentSongPreview.vue";
import { mapGetters, mapState } from "vuex";
import HorizontalBarController from "@/components/Inputs/HorizontalBarController";
export default {
  computed: {
    ...mapGetters(["activeGroupState", "config"]),
    ...mapState(["activeGroup", "speakers"]),
  },
  components: { CurrentSongPreview, HorizontalBarController },
  methods: {
    changeState(speaker) {
      if (speaker.state.playbackState !== "PLAYING") {
        this.axios
          .get(
            `${this.config.sonos.rest_url}/${speaker.roomName}/join/${this.activeGroup.coordinator.roomName}`
          )
          .catch((error) => {
            this.showToastError(error.toString());
          });
      } else if (speaker.state.playbackState === "PLAYING") {
        this.axios
          .get(`${this.config.sonos.rest_url}/${speaker.roomName}/leave`)
          .catch((error) => {
            this.showToastError(error.toString());
          });
      }
    },
  },
};
</script>

<style lang="scss">
#speakergroup-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr auto;
  grid-template-rows: 85% 15%;
  row-gap: 5px;
  column-gap: 5px;
  align-content: center;
  height: 100%;
}

.speakergroup {
  height: 100%;
}

.volume-speaker {
  height: 100%;
}

.speaker-element {
  display: grid;
  padding: 3px;
  grid-template-columns: 2fr 6fr;
  justify-content: center;
  align-content: center;
  font-size: 1vh;
  border-radius: 3px;
  height: 2.5vh;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  fill: rgb(72, 72, 72);
}

.active-speaker {
  background-color: white;
}

.inactive-speaker {
  background-color: $main-light-gray;
}
.inactive-speaker:hover {
  background-color: white;
}
.speaker-element-name {
  justify-self: center;
  align-self: center;
}
#cancel-element {
  margin: 0 10px;
  font-size: 1.5vh;
  // align-self: center;
}

.current-song-wrapper {
}
</style>
