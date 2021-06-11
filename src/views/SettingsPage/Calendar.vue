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
      window.gapi.auth2.getAuthInstance().signIn();
    },
  },
};
</script>

<style></style>
