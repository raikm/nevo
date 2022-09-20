<template>
  <div id="header">
    <Menu />
    <!-- TODO Show People at home -->
    <!-- TODO Show Date and Time -->
  </div>

  <div id="main">
    <NuxtPage class="content-container" />
  </div>

  <!-- <div id="footer"></div> -->
</template>

<script lang="ts" setup>
  import {
    createConnection,
    createLongLivedTokenAuth,
    subscribeEntities,
  } from "home-assistant-js-websocket";
  import { onMounted } from "vue";
  import config from "../../config.json";
  import { useHomeAssistantStore } from "./store/homeassistant";
  import { useStore } from "./store/index";
  import { NevoConfig } from "./types/nevoConfig";

  const homeassistantStore = useHomeAssistantStore();
  const store = useStore();

  store.config = config as NevoConfig;

  const createHomeassistantWebsocketConnection = async () => {
    try {
      const auth = createLongLivedTokenAuth(
        config.homeassistant.hassUrl,
        config.homeassistant.life_time_token_raik
      );
      let connection = await createConnection({ auth });
      subscribeEntities(connection, (entities) => {
        homeassistantStore.haEntities = entities;
      });
      homeassistantStore.haConnection = connection;
    } catch (error) {
      console.log("error while connecting to home assistant");
    }
  };

  onMounted(async () => {
    await createHomeassistantWebsocketConnection();
  });
</script>

<style lang="scss">
  html,
  body {
    height: 100%;
    margin: 0;
  }
  body {
    background: linear-gradient(to top, #9795f0 0%, #fbc8d4 100%);
  }
  #__nuxt {
    display: grid;
    grid-template-rows: 10% 85% 5%;
    height: 100%;
  }
  #header {
    display: grid;
    align-items: center;
  }
  #main {
    display: grid;
    grid-template-columns: auto auto;
    padding: 1rem;
    // margin: auto;

    height: 100%;
  }
  #footer {
    // background: black;
  }

  .content-container {
    overflow-y: auto;
    // padding: 0 15px;
  }
</style>
