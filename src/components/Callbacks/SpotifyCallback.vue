<template>
  <div>
    <span>Spotify Callback Successful!</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import qs from "qs";

export default {
  name: "SpotifyCallback",
  created() {
    if (window.location.search.length > 0) {
      this.handleRedirect();
    }
  },
  computed: {
    ...mapGetters(["config"]),
  },
  methods: {
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
        redirect_uri: encodeURI(window.location.origin + "/SpotifyCallback/"),
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
            if (response.data.access_token != null)
              this.$store.commit(
                "setSpotifyAccessToken",
                response.data.access_token
              );
          }
        })
        .catch((error) => {
          this.ShowToastInfo(error);
        });
    },
  },
};
</script>

<style></style>
