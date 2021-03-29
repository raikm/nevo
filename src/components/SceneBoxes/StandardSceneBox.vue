<template>
  <div v-on:click="triggerShortcut()">
    <svgicon
      class="scene-icon-2"
      :icon="shortcut.entity_id.split('shortcut_')[1]"
      
    ></svgicon>

    <h1 class="scene-name-2">
      {{ shortcut.attributes.friendly_name }}
    </h1>
  </div>
</template>

<script>
//npm run generate-icons
import "@/compiled-icons/start_morning";
import "@/compiled-icons/leave_home";
import "@/compiled-icons/back_home";
import "@/compiled-icons/movie_mode";
import "@/compiled-icons/cleanup";
import "@/compiled-icons/night_mode";
import "@/compiled-icons/plant_lights";

export default {
  props: ["shortcut"],
  data() {
    return {
      config: {
        headers: {
          Authorization: `Bearer ${this.$store.getters.config.homeassistant.life_time_token_raik}`,
        },
      },
    };
  },
  methods: {
    triggerShortcut() {
      
      var bodyParameters = {
        entity_id: this.shortcut.entity_id,
      };
      
      this.$axios
        .post(
          "http://192.168.1.217:8123/api/services/script/turn_on",
          bodyParameters,
          this.config
        )
        .then(console.log)
        .catch((error) => this.showToastError(error));
    },
  },
};
</script>

<style lang="scss">
.scene-icon-2 {
  height: 2.5vh;
  width: 2.5vw;
}

.scene-name-2 {
  margin-right: 1vh;
  float: right;
  font-size: large;
  font-weight: 500;
}
</style>
