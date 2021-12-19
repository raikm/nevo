import "@/styles/displayresolution.scss";
import "@/styles/panoramastyle.scss";
import "@/styles/panoramaVariables.scss";
import axios from "axios";
import { createApp } from "vue";
import VueAxios from "vue-axios";
import App from "./App.vue";
import Socketio from "./plugins/socket";
import router from "./router";
import store from "./store";

// TODO read config

const app = createApp(App);
app.use(Socketio, {
  connection: "192.168.1.217:5005",
});
app.use(VueAxios, axios);
app.use(store);
app.use(router);
app.mount("#app");
