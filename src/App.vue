<template>
  <div id="app">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, 
     user-scalable=0"
    />

    <div id="header-container">
      <div id="logo-container"></div>
      <div id="middle-header-container"></div>
      <DateTimeBox id="time-container" />
    </div>
    <div id="main-container">
      <Menu />
      <router-view class="page"></router-view>
      <Newsfeed />
    </div>
  </div>
</template>

<script>
import DateTimeBox from "@/components/DateTimeBox";
import Menu from "@/components/Menu";
import Newsfeed from "@/components/NewsFeed";
/**
 * get websocket for homeassistant here: https://github.com/home-assistant/home-assistant-js-websocket. (use period)
 */
import {
  createConnection,
  subscribeEntities,
  createLongLivedTokenAuth,
} from "home-assistant-js-websocket";

export default {
  name: "homeapp",
  components: {
    DateTimeBox,
    Menu,
    Newsfeed,
  },
  created() {
    this.connectHomeassistantWebSocket();
  },

  methods: {
    async connectHomeassistantWebSocket() {
      const auth = createLongLivedTokenAuth(
        this.$store.getters.getConfig.homeassistant.hassUrl,
        this.$store.getters.getConfig.homeassistant.life_time_token_raik
      );
      await createConnection({ auth }).then((conn) => {
        subscribeEntities(conn, (entities) => {
          //setHistory
          this.$store.commit("setCurrentEntities", Object.values(entities));
        });
      });
    },
  },
  data() {
    return {
      connection: null,
    };
  },
};
</script>

<style lang="scss">
#header-container {
  width: 100%;
  height: 7vh;
  margin: 0 auto !important;
  display: grid;
  grid-template-columns: 10% 65% auto;
}

#main-container {
  height: 93vh;
  width: 100vw;

  .page {
    padding-right: 2.5rem;
    float: left;
    width: 65%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
