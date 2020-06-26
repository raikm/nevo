import Vue from 'vue'
import axios from 'axios'


import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueAxios from './plugins/axios'
import './mixins/helpersMixin'
import aftership from './plugins/aftership'




Vue.use(VueAxios)
Vue.use(aftership)


Vue.config.productionTip = false
Vue.http = Vue.prototype.$http = axios
window.axios = require('axios')
window.aftership = require('aftership')

Vue.use(Buefy)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

