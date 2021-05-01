<template>
  <div>
    <h1 class="title-1">{{ this.$options.name }}</h1>
    <div class="element-wrapper">
      <div
        :key="key"
        v-for="[key, value] in Object.entries(this.config.spotify)"
      >
        <InfoElement
          :lableName="cleanConfigName(key)"
          :infotext="value"
        ></InfoElement>
      </div>
    </div>
    <div class="element-wrapper">
      <InfoElement
        :lableName="'ACESS TOKEN'"
        :infotext="localStorage.getItem('spotify_access_token')"
      ></InfoElement>
    </div>
    <div
      v-if="localStorage.getItem('spotify_access_token') == null"
      class="element-wrapper"
      @click="requestAuthorization()"
    >
      <ActionElement lableName="Connect to Spotify"></ActionElement>
    </div>
    <h1 class="title-2">Spotify Playlists</h1>
    <div class="element-wrapper">

    </div>
  </div>
</template>

<script>
import InfoElement from "./Components/InfoElement";
import ActionElement from "./Components/ActionElement";
import { mapGetters } from "vuex";
import qs from "qs";

export default {
  name: "Spotify",
  components: { InfoElement, ActionElement },
  created() {
    if (window.location.search.length > 0) {
      // console.log("handleRedirect")
      this.handleRedirect();
    }
  },
  computed: {
    ...mapGetters(["config"]),
  },
  data() {
    return {
      localStorage: localStorage,
    };
  },
  methods: {
    requestAuthorization() {
      let url = "https://accounts.spotify.com/authorize";
      url += "?client_id=" + this.config.spotify.client_id;
      url += "&response_type=code";
      url +=
        "&redirect_uri=" +
        encodeURI(window.location.origin + "/SettingsPage/Spotify/");
      url += "&show_dialog=true";
      url += "&scope=playlist-read-private";
      window.location.href = url;
    },
    handleRedirect() {
      let code = this.getCode();
      this.authSpotifyAccount(code);
    },
    getCode() {
      let code = null;
      const queryString = window.location.search;
      if (queryString.length > 0) {
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get("code");
      }
      return code;
    },
    authSpotifyAccount(code) {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        auth: {
          username: this.config.spotify.client_id,
          password: this.config.spotify.client_secret,
        },
      };
      const data = {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: encodeURI(
          window.location.origin + "/SettingsPage/Spotify/"
        ),
        client_id: this.config.spotify.client_id,
        client_secret: this.config.spotify.client_secret,
      };
      //TODO: only if access token not avaible in store
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
  },
};
</script>

<style lang="scss"></style>
