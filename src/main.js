import { createApp } from 'vue';
import axios from 'axios'
import VueAxios from './plugins/axios'


import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
// import Buefy from 'buefy'
// import 'buefy/dist/buefy.css'
// //https://www.digitalocean.com/community/tutorials/vuejs-using-svg-icons
//import VueSVGIcon from 'vue-svgicon'
// import './mixins/helpersMixin'
// import aftership from './plugins/aftership'




// Vue.use(aftership)


//Vue.http = Vue.prototype.$http = axios
//window.axios = require('axios')
// window.aftership = require('aftership')
// Vue.use(VueSVGIcon)
// Vue.use(Buefy)
const app = createApp(App).use(router).use(router).mount('#app')
app.use(VueAxios, axios) // 👈


