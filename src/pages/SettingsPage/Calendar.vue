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
  </div>
</template>

<script>
import InfoElement from "./Components/InfoElement";
import { mapGetters } from "vuex";
export default {
  name: "Calendar",
  components: { InfoElement },
  computed: {
    ...mapGetters(["config"]),
  },
  methods: {
    cleanConfigName(configName) {
      let cleanName = configName.replace("_", " ").toUpperCase();
      return cleanName;
    },
  },
};
</script>

<style></style>
