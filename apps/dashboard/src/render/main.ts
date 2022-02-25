import '@/styles/displayresolution.scss'
import '@/styles/mainstyle.scss'
import '@/styles/variables.scss'
import axios from 'axios'
import { createApp } from 'vue'
import VueAxios from 'vue-axios'
import config from '../../../../config.json'
import App from './App.vue'
import { Gapi } from './plugins/gapi'
import Socketio from './plugins/socketIO'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(Socketio, {
  connection: config.sonos.websocket_url,
})

// app.use(Socketio, {
//   connection: config.sonos.websocket_url,
// });
app.use(Gapi)
app.use(VueAxios, axios)
app.use(store)
app.use(router)
app.mount('#app')
