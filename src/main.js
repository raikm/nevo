import Vue from "vue";
import axios from "axios";
import store from "./store";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import VueAxios from "./plugins/axios";
//https://www.digitalocean.com/community/tutorials/vuejs-using-svg-icons
import VueSVGIcon from "vue-svgicon";
import "./mixins/helpersMixin";
import aftership from "./plugins/aftership";
import VueGapi from 'vue-gapi'
const { google_calendar } = require("../config.json");
//TODO: Catch missing config.json

const config = {
  apiKey: google_calendar.api_key,
  clientId: google_calendar.client_id,
  scope: 'https://www.googleapis.com/auth/calendar.readonly',
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
}

Vue.use(VueAxios);
Vue.use(aftership);
Vue.use(store);
Vue.use(VueGapi, config)
Vue.use(VueSVGIcon);
Vue.use(Buefy);


Vue.config.productionTip = false;
Vue.http = Vue.prototype.$http = axios;
window.axios = require("axios");
window.aftership = require("aftership");


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

