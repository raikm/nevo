<template>
  <div>
    <h1 class="title-1">{{ this.$options.name }}</h1>

    <div class="element-wrapper">
      <div
        :key="key"
        v-for="[key, value] in Object.entries(this.config.google_calendar)"
      >
        <InfoElement
          :lableName="cleanConfigName(key)"
          :infotext="value"
        ></InfoElement>
      </div>
    </div>
    <div class="element-wrapper" @click="startAuth()">
      <ActionElement lableName="Connect to Google Calendar" />
    </div>
  </div>
</template>

<script>
import InfoElement from "@/components/Inputs/ActionElement";
import ActionElement from "@/components/Inputs/ActionElement";
import { mapGetters } from "vuex";

export default {
  name: "Calendar",
  components: { InfoElement, ActionElement },
  computed: {
    ...mapGetters(["config"]),
  },
  methods: {
    startAuth() {
      window.gapi.load("client:auth2", this.initGoogleClient);
    },
    initGoogleClient() {
      const {
        api_key,
        discovery_docs,
        client_id,
        scope,
      } = this.config.google_calendar;

      window.gapi.client
        .init({
          apiKey: api_key,
          discoveryDocs: discovery_docs,
          clientId: client_id,
          scope: scope,
        })
        .then(() => {
          // Listen for sign-in state changes.
          window.gapi.auth2
            .getAuthInstance()
            .isSignedIn.listen(this.updateSigninStatus);

          // Handle the initial sign-in state.
          this.updateSigninStatus(
            window.gapi.auth2.getAuthInstance().isSignedIn.get()
          );
        });
    },
    updateSigninStatus(isSignedIn) {
      if (isSignedIn) {
        console.log("isSignedIn: " + isSignedIn);
      } else {
        console.log("isSignedIn: " + isSignedIn);
      }
    },
  },
};
</script>

<style></style>
