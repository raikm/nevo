import { createApp } from "vue";

import store from "./store";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import mixin from "./mixins/helpersMixin";
import App from "./App.vue";

const app = createApp(App);
app.mixin(mixin);
app.use(store);
app.use(router);
app.use(VueAxios, axios);
app.mount("#app");

// import "./registerServiceWorker";
// import { ToastProgrammatic as Toast } from "buefy";
//https://www.digitalocean.com/community/tutorials/vuejs-using-svg-icons
// import VueSVGIcon from "vue-svgicon";
// Vue.http = Vue.prototype.$http = axios;
// window.axios = require("axios");
// window.aftership = require("aftership");
// import VueSocketIO from 'vue-3-socket.io'
// app.use(VueSVGIcon, {
//   isOriginalDefault: true,
// });

// const socketio = new VueSocketIO({
//   debug: true,
//   connection: 'http://192.168.1.217:5008',
// });

// app.use(socketio);

