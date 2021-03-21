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
      <router-view id="page"></router-view>
      <Newsfeed v-if="this.$store.getters.showNotification" />
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


// import io from 'socket.io-client'


export default {
  name: "homeapp",
  components: {
    DateTimeBox,
    Menu,
    Newsfeed,
  },
  created() {
    // this.connectHomeassistantWebSocket();
    this.connectSonosWebsocket();
    this.$gapi.login(() => {
      this.$router.push("/");
    });
    this.$gapi.getGapiClient().then((gapi) => {
      gapi.client.calendar.calendarList
        .list()
        .then((response) => {
          this.$store.commit("setGCalendars", response.result.items);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },

  methods: {
    async connectHomeassistantWebSocket() {
      const auth = createLongLivedTokenAuth(
        this.$store.getters.config.homeassistant.hassUrl,
        this.$store.getters.config.homeassistant.life_time_token_raik
      );
      await createConnection({ auth }).then((conn) => {
        subscribeEntities(conn, (entities) => {
          //setHistory
          this.$store.commit("setCurrentEntities", Object.values(entities));
        });
      });
    },
    connectSonosWebsocket() {
     
      // console.log("start socket: " + this.$store.getters.config.sonos.websocketURL)
      // io(this.$store.getters.config.sonos.sonosURL);

      

    },
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
  max-width: 1920px;
  margin: 0 auto;

  #page {
    // padding-right: 2.5rem;
    float: left;
    // width: 90%;
    //Debug
    width: 65%;
    height: 100%;
    overflow: hidden;
    padding-top: 2.5rem;
    padding-right: 2.5rem;
  }
}
</style>
