<template>
  <template id="dashboard" v-if="!isMobile">
    <div id="header">
      <!-- logo / icon -->
      <!-- Show People at home -->
      <!-- Show Date and Time -->
    </div>
    <div id="main">
      <Menu />
      <router-view class="content-container"></router-view>
      <!-- {{ getScreensize() }} -->
    </div>

    <div id="footer"></div>
  </template>
  <template v-else>
    <!-- <router-view class="content-container"></router-view> -->
    <!-- {{ getScreensize() }} -->
  </template>
</template>

<script lang="ts" setup>
// Components
import Menu from "@/components/menu/index.vue";
// Websockets
import {
  createConnection,
  // subscribeServices,
  createLongLivedTokenAuth, subscribeEntities
} from "home-assistant-js-websocket";
import { computed, onMounted, onUnmounted, ref } from "vue";
// Config
import config from "../../../../config.json";
import router from "./router";
import store from "./store";

const createHomeassistantWebsocketConnection = async () => {
  const auth = createLongLivedTokenAuth(
    config.homeassistant.hassUrl,
    config.homeassistant.life_time_token_raik
  );
  let connection = await createConnection({ auth });
  subscribeEntities(connection, (entities) => {
    store.commit("setHaEntities", Object.values(entities));
  });
  store.commit("setHaConnection", connection);
}

let windowWidth = ref(window.innerWidth)

const onWidthChange = () => windowWidth.value = window.innerWidth
onMounted(() => window.addEventListener('resize', onWidthChange))
onUnmounted(() => window.removeEventListener('resize', onWidthChange))

const width = computed(() => windowWidth.value)


const isMobile = computed(() => {
  if (width.value <= 760) {
    router.push('/mobile');
    return true;
  }
  else {
    // router.push('/');
    return false;
  }
})

store.commit("setConfigFile", config);
createHomeassistantWebsocketConnection();

if (isMobile.value) {
  router.push('/mobile');
} else {
  // router.push('/');
}

</script>

<style lang="scss">
#app {
  display: grid;
  grid-template-rows: 10% 85% 5%;
  height: 100%;
}
#header {
  // background: black;
}
#main {
  display: grid;
  grid-template-columns: auto auto;
  padding: 15px;
  margin: auto;
  height: 100%;
}
#footer {
  // background: black;
}

.content-container {
  overflow-y: auto;
  padding: 0 15px;
}
</style>
