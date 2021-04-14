import Vue from "vue";
import axios from "axios";
import store from "./store";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
//TODO only import toast
import Buefy from "buefy";
import "buefy/dist/buefy.css";

import VueAxios from "./plugins/axios";
//https://www.digitalocean.com/community/tutorials/vuejs-using-svg-icons
import VueSVGIcon from "vue-svgicon";
import "./mixins/helpersMixin";

// import aftership from "./plugins/aftership";

import VueSocketIO from "vue-socket.io";
Vue.use(
  new VueSocketIO({
    // debug: true,
    connection: "http://192.168.1.217:5008",
  })
);

Vue.use(VueAxios);
// Vue.use(aftership);
Vue.use(store);
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
