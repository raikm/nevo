import "@/styles/displayresolution.scss";
import "@/styles/panoramastyle.scss";
import "@/styles/panoramaVariables.scss";
import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";




const app = createApp(App)

app.use(router);
app.mount('#app')
