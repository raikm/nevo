<template>
  <div id="dashboard-wrapper">
    <div id="boxes">
      <!--   <Music class="box dashboard-box box-m box-white" /> -->
      <HomeClimate class="box dashboard-box box-white" />
      <RoomLightController
        v-if="homeAssistantStore.haConnection"
        class="box dashboard-box box-s box-white"
      />
      <PublicTransport class="box dashboard-box box-m box-white" />
      <Weather class="box dashboard-box box-s" />
      <Calendar class="box dashboard-box box-m box-white" />
    </div>
    <div id="shortcuts">
      <!-- <Shortcut
        :shortcut="shortcut"
        v-for="shortcut in homeAssistantStore.shortcutEntities"
      /> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import Calendar from '../components/dashboard-widgets/calendar/index.vue'
import HomeClimate from '../components/dashboard-widgets/home-climate/index.vue'
import PublicTransport from '../components/dashboard-widgets/public-transport/index.vue'
import RoomLightController from '../components/dashboard-widgets/room-light-controller/index.vue'
import Weather from '../components/dashboard-widgets/weather/index.vue'
import { useSpotifyService } from '../services/spotify/index'
import { useHomeAssistantStore } from '../store/homeassistant'
import { useStore } from '../store/index'

const homeAssistantStore = useHomeAssistantStore()
const store = useStore()
const spotifyService = useSpotifyService(store)
// TODO if (window.location.search.length > 0) {
//   spotifyService.handleSpotifyRedirect();
// }
</script>

<style lang="scss" scoped>
@import '../../../packages/style/main.scss';

#dashboard-wrapper {
  max-width: calc(320px * 3 + 8rem);
  position: relative;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

#dashboard-wrapper::-webkit-scrollbar {
  display: none;
}

#boxes {
  display: grid;
  column-gap: 1rem;
  row-gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr;
  flex-wrap: wrap;
}

#shortcuts {
  position: absolute;
  bottom: 0px;
  width: 100%;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  display: inline-flex;
  overflow: scroll;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  column-gap: $standard-space;
}

#shortcuts::-webkit-scrollbar {
  display: none;
}

#__nuxt {
  display: grid;
  grid-template-rows: 10% 85% 5%;
  height: 100%;
  max-width: 100rem;
  margin: auto;
}
</style>
