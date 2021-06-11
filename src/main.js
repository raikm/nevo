import Vue from "vue";
import store from "./store";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import {ToastProgrammatic as Toast} from "buefy";
import "./registerServiceWorker";
//https://www.digitalocean.com/community/tutorials/vuejs-using-svg-icons
import VueSVGIcon from "vue-svgicon";
import "./mixins/helpersMixin";

import VueSocketIO from "vue-socket.io";
Vue.use(
  new VueSocketIO({
    // debug: true,
    connection: "http://192.168.1.217:5008",
  })
);

Vue.use(store);
Vue.use(Toast)
Vue.use(VueSVGIcon, {
  isOriginalDefault: true
});

Vue.config.productionTip = false;
Vue.http = Vue.prototype.$http = axios;
window.axios = require("axios");
window.aftership = require("aftership");


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
