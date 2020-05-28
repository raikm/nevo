import Vue from 'vue'
import axios from 'axios'


import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueAxios from './plugins/axios'

Vue.use(VueAxios)

Vue.config.productionTip = false
Vue.http = Vue.prototype.$http = axios
window.axios = require('axios')


Vue.use(Buefy)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

