<template>
  <div class="shortcut-pill" @click="triggerShortcut">
    <span>⠕ {{ shortcut.attributes.friendly_name }}</span>
  </div>
</template>


<script lang="ts" setup>
import axios from 'axios';
import { HassEntityBase } from 'home-assistant-js-websocket';
import { useStore } from 'vuex';

const props = defineProps<{
  shortcut: HassEntityBase
}>()

const store = useStore()

const config = {
  headers: {
    Authorization: `Bearer ${store.state.config.homeassistant.life_time_token_raik}`,
  },
}

const triggerShortcut = () => {
  var bodyParameters = {
    entity_id: props.shortcut.entity_id,
  };
  axios
    .post(
      `${store.state.config.homeassistant.hassUrl}/api/services/script/turn_on`,
      bodyParameters,
      config
    )
    .catch((error) => console.error(error));
}


</script>


<style lang="scss">
@import "../../../../../libs/style/mainstyle.scss";

.shortcut-pill {
  margin: 1rem 1px;
  background-color: white;
  border-radius: 99px;
  height: 2rem;
  display: grid;
  place-items: center;
  font-size: 0.8rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  backdrop-filter: saturate(130%) blur(20px);
}
</style>
