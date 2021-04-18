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
      <!-- <Newsfeed v-if="this.$store.getters.showNotification" /> -->
    </div>
  </div>
</template>

<script>
import DateTimeBox from "@/components/DateTimeBox";
import Menu from "@/components/Menu";
// import Newsfeed from "@/components/NewsFeed";

/**
 * get websocket for homeassistant here: https://github.com/home-assistant/home-assistant-js-websocket. (use period)
 */
import {
  createConnection,
  subscribeEntities,
  createLongLivedTokenAuth,
} from "home-assistant-js-websocket";
import { mapGetters } from "vuex";

// import io from 'socket.io-client'

export default {
  name: "homeapp",
  components: {
    DateTimeBox,
    Menu,
    // Newsfeed,
  },
  computed: {
    ...mapGetters(["config"]),
  },
  created() {
    this.connectHomeassistantWebSocket();
    this.connectSonosWebsocket();
    this.connectGoogleApi();
  },

  methods: {
    connectGoogleApi() {
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
        }).catch((error) => {
          console.error(error)
        });
    },
    updateSigninStatus(isSignedIn) {
      if (isSignedIn) {
        console.log("isSignedIn: " + isSignedIn);
        this.setGoogleCalendars();
      } else {
        console.log("isSignedIn: " + isSignedIn);
      }
    },
    setGoogleCalendars() {
      window.gapi.client.calendar.calendarList
        .list()
        .then((response) => {
          this.$store.commit("setGCalendars", response.result.items);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async connectHomeassistantWebSocket() {
      const auth = createLongLivedTokenAuth(
        this.$store.getters.config.homeassistant.hassUrl,
        this.$store.getters.config.homeassistant.life_time_token_raik
      );
      await createConnection({ auth }).then((conn) => {
        subscribeEntities(conn, (entities) => {
          //setHistory
          // console.log(entities);
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
  padding: 0 2.5rem !important; 
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
    width: 90%;
    max-width: 1400px;
    //Debug
    // width: 65%;
    height: 100%;
    overflow-x: scroll;
    padding-top: 2.5rem;
    padding-right: 2.5rem;
  }
}
</style>
