<template>
  <div class="playlist-shortcuts-container">
    <div class="playlist-shortcuts-container">
      <div
        class="playlist-cover-info-wrapper"
        :key="playlist.id"
        v-for="playlist in playlists"
        @click="playPlaylist(playlist.uri)"
      >
        <img class="playlist-cover" :src="playlist.images[0].url" alt="" />
        <div class="playlist-info">
          {{ playlist.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../../compiled-icons/music";
import { mapGetters } from "vuex";

export default {
  name: "MusicPlayerPlaylistController",
  created() {
    this.getAllPlaylists();
  },

  computed: {
    ...mapGetters(["config", "activeSpeaker"]),
  },
  methods: {
    getAllPlaylists() {
      const config = {
        headers: {
          Authorization: `Bearer ${this.$store.getters.spotifyAccessToken}`,
          "Content-Type": "application/json",
        },
      };
      this.$axios
        .get("https://api.spotify.com/v1/me/playlists", config)
        .then((response) => {
          if (response.data.items.length !== 0) {
            this.playlists = response.data.items;
          }
        })
        .catch((error) => this.showToastError(error.message));
    },
    playPlaylist(uri) {
      this.$axios
        .get(
          `${this.config.sonos.rest_url}/Lounge/spotify/now/spotify:user:${uri}`
        )
        .then(() => {})
        .catch((error) => this.showToastError(error.message));
    },
  },
  data() {
    return {
      playlists: [],
    };
  },
};
</script>

<style lang="scss">
.playlist-shortcuts-container {
  .playlist-shortcuts-container {
    display: grid;
    grid-gap: 5px;
    //visible covers:
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-auto-flow: column;
    //hidden covers:
    grid-auto-columns: minmax(100px, 1fr);
    grid-template-rows: minmax(100px, 1fr);
    overflow-x: scroll;
    max-width: 100%;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
.playlist-cover-info-wrapper {
  .playlist-cover {
    border-radius: 5px;
  }

  .playlist-info {
    font-size: small;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
