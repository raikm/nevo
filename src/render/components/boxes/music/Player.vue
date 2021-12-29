<template>
  <div class="player-wrapper" v-if="currentTrack.length !== 0">
    <div id="player">
      <div id="title-info-container">
        <div id="cover-img">
          <img id="album-cover" :src="currentTrack.absoluteAlbumArtUri" />
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
        <!-- <HorizontalBarController
          ref="volumeControl"
          id="volume-control"
          @change-slider-value="changeVolume"
          :value="
            activeGroup != null
              ? activeGroup.coordinator.state.volume
              : latestActiveGroup.coordinator.state.volume
          "
        />-->
        <div id="volume-icon-container">
          <!-- <svgicon id="volume-icon" icon="volume_medium"></svgicon> -->
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
import { Speaker, Zone } from './sonosTypes'

export default defineComponent({
  setup() {
    let zones = ref([] as Zone[]) // TODO Zone Zypes
    const getZones = () => {
      axios.get(
        `${store.state.config.sonos.rest_url}/zones`
      ).then((response: any) => {
        zones.value = response.data
      }).catch((error: Error) => {
        console.log(error.message.toString());
      });
    }
    getZones()

    // 2. copy elements and see which computed elements are needed

    const activeGroup = computed(() => {
      return zones.value.filter((zone: Zone) =>
        zone.coordinator.state != null
          ? zone.coordinator.state.playbackState === "PLAYING"
          : []
      )[0] || null;
    });


    // ?
    let latestActiveGroup = ref();

    const speakers = computed(() => {

      let speakers: Speaker[] = []

      zones.value.forEach((zone: Zone) => {
        zone.members.forEach((member: Speaker) => {
          speakers.push(member);
        });
      });

      speakers.sort((a: Speaker, b: Speaker) =>
        a.roomName.localeCompare(b.roomName)
      );

      return speakers
    });

    const activeGroupState = computed(() => { return activeGroup.value != null ? (activeGroup.value as any).coordinator.state : null }); // TODO
    const currentTrack = computed(() => { { return activeGroupState.value != null ? (activeGroupState.value as any).currentTrack : "" } });
    const volumeOfActiveZone = computed(() => { return activeGroupState.value != null ? (activeGroupState.value as any).volume : 0 });

    const activeSpeakerNames = computed(() => {
      let result = "";
      for (
        let index = 0;
        index < activeGroup.value.members.length - 1;
        index++
      ) {
        result += activeGroup.value.members[index].roomName + ", ";
      }
      result += activeGroup.value.members[activeGroup.value.members.length - 1].roomName;
      return result;
    });



    // watch sonos changes
    const socket: Socket = inject('socket')!;
    socket.on("connect", () => console.log("connection"));
    //TODO console.log(socket)
    socket.on("change", () => {
      // let result = JSON.parse(data.toString());
      getZones()
      console.log("change")
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

    return { zones, activeGroup, latestActiveGroup, activeGroupState, speakers, volumeOfActiveZone, currentTrack, activeSpeakerNames }
  }
})
</script>

<style lang="scss">
.player-wrapper {
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