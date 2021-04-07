<template>
  <div>
    <Button @click="requestAuthorization()">Connect to Spotify</Button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SettingsPage",
  computed: {
    ...mapGetters(["config"]),
  },
  methods: {
    requestAuthorization() {
    //TODO: Get base URI for redirect uri

      let url = "https://accounts.spotify.com/authorize";
      url += "?client_id=" + this.config.spotify.client_id;
      url += "&response_type=code";
      url +=
        "&redirect_uri=" +
        encodeURI(window.location.origin + "/SpotifyCallback/");
      url += "&show_dialog=true";
      url += "&scope=playlist-read-private";
      window.location.href = url;
    },
  },
};
</script>

<style></style>
