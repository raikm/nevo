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
  </div>
</template>

<script>
import InfoElement from "./Components/InfoElement";
import { mapGetters } from "vuex";

export default {
  name: "Spotify",
  components: { InfoElement },
  computed: {
    ...mapGetters(["config"]),
  },
  methods: {
    cleanConfigName(configName) {
      let cleanName = configName.replace("_", " ").toUpperCase();
      return cleanName;
    },
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

<style lang="scss">

</style>
