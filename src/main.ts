import Vue, { createApp } from "vue";
// import store from "./store";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import { ToastProgrammatic as Toast } from "buefy";
import "./registerServiceWorker";
//https://www.digitalocean.com/community/tutorials/vuejs-using-svg-icons
// import VueSVGIcon from "vue-svgicon";
import "./mixins/helpersMixin";
// import VueSocketIO from 'vue-3-socket.io'
import mixin from "./mixins/helpersMixin"

// Vue.http = Vue.prototype.$http = axios;
// window.axios = require("axios");
// window.aftership = require("aftership");

const app = createApp(App)
app.mixin(mixin);
// app.use(store);
app.use(router);
// app.use(VueSVGIcon, {
//   isOriginalDefault: true,
// });

// const socketio = new VueSocketIO({
//   debug: true,
//   connection: 'http://192.168.1.217:5008',
// });

// app.use(socketio);

app.mount("#app");
