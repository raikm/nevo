<template>
  <div class="basic-card click-element shortcut-box" @click="triggerShortcut">
    <svgicon
      class="scene-icon"
      :icon="shortcut.entity_id.split('shortcut_')[1]"
    ></svgicon>
  </div>
</template>

<script>
import "@/compiled-icons/start_morning";
import "@/compiled-icons/leave_home";
import "@/compiled-icons/back_home";
import "@/compiled-icons/movie_mode";
import "@/compiled-icons/cleanup";
import "@/compiled-icons/night_mode";
import "@/compiled-icons/light_plant_light";
import "@/compiled-icons/evening_mode";
import "@/compiled-icons/shower_mode";
import "@/compiled-icons/curtain";

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

      this.axios
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
.shortcut-box {
  display: flex;
  justify-content: center;
}

.scene-icon {
  align-self: center;
  height: 60%;
  width: 60%;
}
</style>
