<template>
  <div class="music-control-box">
    <MusicPlayer v-if="showMusicPlayer" @showPlaylists="showPlaylists" />
    <Playlists v-else id="music-control" @showPlaylists="showPlaylists" />
  </div>
</template>

<script>
import Playlists from "./Playlists";
import MusicPlayer from "./MusicPlayer";
import "@/compiled-icons/volume_medium";
import { mapGetters, mapState } from "vuex";

export default {
  components: {
    Playlists,
    MusicPlayer,
  },
  computed: {
    ...mapState(["config"]),
    ...mapGetters(["activeGroup"]),
  },
  data() {
    return {
      showMusicPlayer: false,
    };
  },
  watch: {
    activeGroup() {
      let timeout;
      console.log(this.activeGroup);
      if (this.activeGroup == null) {
        console.log("close player in 5min");
        timeout = setTimeout(() => {
          this.showMusicPlayer = false;
        }, 50000);
      } else {
        clearTimeout(timeout);
        this.showMusicPlayer = true;
      }
    },
  },
  mounted() {
    this.setUpZones();
  },

  methods: {
    setUpZones() {
      if (this.config.sonos.rest_url === "<IP_ADDRESS>") return;
      this.axios
        .get(this.config.sonos.rest_url + "/zones")
        .then((response) => {
          this.$store.commit("setSpeakers", response.data);
        })
        .catch((error) => {
          console.log(error.toString());
        });
    },
    showPlaylists() {
      this.showMusicPlayer =
        this.showMusicPlayer === false ? (this.showMusicPlayer = true) : false;
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
  display: grid;
}
#music-control {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
