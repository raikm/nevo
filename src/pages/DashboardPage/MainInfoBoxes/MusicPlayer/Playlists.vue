<template>
  <div>
    <div v-if="playlists.length !== 0" class="playlist-shortcuts-container-wrapper">
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
      <div id="stream-services">
        <!-- <div class="standard-button">
        Apple
      </div>
      <div class="standard-button">
        Spotify
      </div> -->
      </div>
    </div>
    <div v-else class="service-info">
      Service not available
    </div>
  </div>
</template>

<script>
import "@/compiled-icons/music";
import { mapGetters } from "vuex";
import qs from "qs";

export default {
  name: "Playlists",
  created() {
    this.getAllPlaylists();
  },

  computed: {
    ...mapGetters(["config", "activeGroup"]),
  },
  methods: {
    getAllPlaylists() {
      if (localStorage.getItem("spotify_access_token").length === 0) return;
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "spotify_access_token"
          )}`,
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
        //catch 401
        .catch((error) => {
          if (error.status == 401) this.refreshAccessToken();
          else console.error(error);
        });
    },
    refreshAccessToken() {
      let refresh_token = localStorage.getItem("spotify_refresh_token");
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        auth: {
          username: this.config.spotify.client_id,
          password: this.config.spotify.client_secret,
        },
      };
      const data = {
        grant_type: "refresh_token",
        redirect_uri: encodeURI(
          window.location.origin + "/SettingsPage/Spotify/"
        ),
        refresh_token: refresh_token,
        client_id: this.config.spotify.client_id,
      };
      this.$axios
        .post(
          "https://accounts.spotify.com/api/token",
          qs.stringify(data),
          headers
        )
        .then((response) => {
          if (this.$store.getters.spotifyAccessToken.length === 0) {
            if (response.data.access_token != undefined) {
              let access_token = response.data.access_token;
              localStorage.setItem("spotify_access_token", access_token);
            }
            if (response.data.refresh_token != undefined) {
              let refresh_token = response.data.refresh_token;
              localStorage.setItem("spotify.refresh_token", refresh_token);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
      localStorage: localStorage,
    };
  },
};
</script>

<style lang="scss">
.playlist-shortcuts-container-wrapper {
  width: 100%;
  overflow: hidden;
}

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

  // max-width: 100%;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
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

#stream-services {
  display: grid;
  grid-template-columns: 20% 20% auto;
  column-gap: 5px;
}
</style>
