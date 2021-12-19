<template>
  <div class="player-wrapper" v-if="currentTrack.length !== 0">
    <div id="player">
      <div id="title-info-container">
        <div id="cover-img">
          <img id="album-cover" :src="currentTrack.absoluteAlbumArtUri" alt />
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
          <!-- <div
            id="progress-track"
            :style="{
              width:
                (currentTrackSeconds / this.currentTrack.duration) * 100 +
                '%',
            }"
          ></div>-->
        </div>
        <!-- <div class="play-duration">{{ endTrackTime }}</div> -->
      </div>

      <div id="player-control">
        <div id="playlist-icon" @click="$emit('showPlaylists')">☰</div>
      </div>
      <div v-if="activeGroup || latestActiveGroup" id="volume-control-wrapper">
        <HorizontalBarController
          ref="volumeControl"
          id="volume-control"
          @change-slider-value="changeVolume"
          :value="
            activeGroup != null
              ? activeGroup.coordinator.state.volume
              : latestActiveGroup.coordinator.state.volume
          "
        />
        <div id="volume-icon-container">
          <svgicon id="volume-icon" icon="volume_medium"></svgicon>
        </div>
      </div>
    </div>

    <div>
      <!-- TODO Speaker Element -->
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { Socket } from 'socket.io-client'
import { computed, defineComponent, inject, ref } from 'vue'
import store from '../../../store'

export default defineComponent({
  setup() {
    let zones = ref([] as object) // TODO Zone Zypes
    const getZones = () => {
      axios.get(
        `${store.state.config.sonos.websocket_url}/zones`
      ).then((response: any) => {
        zones.value = response.data
      }).catch((error: Error) => {
        console.log(error.message.toString());
      });
    }
    getZones()

    // NEXT TODOS:
    // 1. define types
    // 2. copy elements and see which computed elements are needed

    const activeGroup = computed(() => { return null });
    // ?
    let latestActiveGroup = ref();
    const speakers = computed(() => { return null });

    const activeGroupState = computed(() => { return activeGroup.value != null ? (activeGroup.value as any).coordinator.state : null }); // TODO
    const currentTrack = computed(() => { { return activeGroupState.value != null ? (activeGroupState.value as any).currentTrack : "" } });
    const volumeOfActiveZone = computed(() => { return activeGroupState.value != null ? (activeGroupState.value as any).volume : 0 });

    const activeSpeakerNames = computed(() => { return null });



    // watch sonos changes
    const socket: Socket = inject('socket')!;
    socket.on("change", () => {
      // let result = JSON.parse(data.toString());
      getZones()
      // if (result.type === "transport-state") {
      //   // snapshot of player
      //   getZones()
      // }
      // else if (result.type === "topology-change") {
      //   // snapshot of zones
      //   getZones()
      // }
      // else if (result.type === "volume-change") {
      //   getZones()
      // }
    });

    return { activeGroup, latestActiveGroup, activeGroupState, speakers, volumeOfActiveZone, currentTrack, activeSpeakerNames }
  }
})
</script>

<style lang="scss">
</style>