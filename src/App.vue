<template>
  <div id="app">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, 
     user-scalable=0"
    />
    <div id="header-container">
      <div id="logo-container"></div>
      <div id="middle-header-container">
        <div class="persons">
          <Person :key="n" v-for="n in 4" :n="n" />
        </div>
      </div>
      <DateTime/>
    </div>
    <div id="main-container">
      <Menu id="menu" />
      <router-view id="page"></router-view>
      <!-- <Newsfeed v-if="this.showNotification" id="newsfeed" /> -->
    </div>
  </div>
</template>

<script>
import DateTime from "@/components/DateTime";
import Menu from "@/components/Menu";
import Person from "@/components/Person";
/**
 * get websocket for homeassistant here: https://github.com/home-assistant/home-assistant-js-websocket. (use period)
 */
// import {
//   createConnection,
//   subscribeEntities,
//   // subscribeServices,
//   createLongLivedTokenAuth,
// } from "home-assistant-js-websocket";
import { mapGetters } from "vuex";

// import io from 'socket.io-client'

export default {
  name: "homeapp",
  components: {
    DateTime,
    Menu,
    Person,
  },
  computed: {
    ...mapGetters(["config", "showNotification", "hAConnection"]),
  },
  created() {
    // this.connectHomeassistantWebSocket();
  },

  methods: {
    // async connectHomeassistantWebSocket() {
    //   const auth = createLongLivedTokenAuth(
    //     this.$store.getters.config.homeassistant.hassUrl,
    //     this.$store.getters.config.homeassistant.life_time_token_raik
    //   );
    //   // await createConnection({ auth }).then((conn) => {
    //   //   subscribeEntities(conn, (entities) => {
    //   //     this.$store.commit("setCurrentEntities", Object.values(entities));
    //   //   });
    //   // });
    //   let _hAconnection = await createConnection({ auth });
    //   this.$store.commit("setHaConnection", _hAconnection);
    //   subscribeEntities(this.hAConnection, (entities) => {
    //     this.$store.commit("setCurrentEntities", Object.values(entities));
    //   });
    //   // subscribeServices(this.hAconnection, (services) => console.log("New services!", services));
    // },
  },
};
</script>

<style lang="scss">
#app {
  height: 100%;
}

#header-container {
  width: 100%;
  max-width: 1920px;
  display: grid;
  grid-template-columns: 10% 70% 20%;
  height: 10%;
  #logo-container {
    width: 7.5vh;
    margin: 0 $standard-space;
  }
  #middle-header-container {
    align-self: center;
    .persons {
      // display: inline-flex;
      display: none;
    }
  }
}

#main-container {
  width: 100%;
  max-width: 1920px;
  display: grid;
  grid-template-columns: auto 90% 2.5%;
  height: 90%;
  overflow: hidden;
  #menu {
    margin: 0 $standard-space;
  }
  #page {
    height: 100%;
    // overflow-x
    overflow-x: scroll;
    // padding-right: 2.5rem;
  }
  // #newsfeed {
  //   margin: 0 $standard-space;
  //   overflow-y: scroll;

  // }
}
</style>
