import { createApp } from "vue";

import store from "./store";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import VueSocketIO from 'vue-socket.io'
import mixin from "./mixins/helpersMixin";
import App from "./App.vue";

const app = createApp(App);
app.mixin(mixin);
app.use(store);
app.use(router);
app.use(VueAxios, axios);
//connection: "http://192.168.1.217:5008",
// app.use()
app.config.globalProperties.$socket = new VueSocketIO({
    debug: true,
    connection: 'http://192.168.1.217:5008',
})
app.mount("#app");

// import "./registerServiceWorker";
//https://www.digitalocean.com/community/tutorials/vuejs-using-svg-icons
// import VueSVGIcon from "vue-svgicon";
// Vue.http = Vue.prototype.$http = axios;
// window.axios = require("axios");
// window.aftership = require("aftership");
// app.use(VueSVGIcon, {
//   isOriginalDefault: true,
// });
