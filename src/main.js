import Vue from 'vue'
import axios from 'axios'
import store from './store'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueAxios from './plugins/axios'
//https://www.digitalocean.com/community/tutorials/vuejs-using-svg-icons
import VueSVGIcon from 'vue-svgicon'
import './mixins/helpersMixin'
import aftership from './plugins/aftership'







Vue.use(VueAxios)
Vue.use(aftership)
Vue.use(store)


Vue.config.productionTip = false
Vue.http = Vue.prototype.$http = axios
window.axios = require('axios')
window.aftership = require('aftership')
Vue.use(VueSVGIcon)
Vue.use(Buefy)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

