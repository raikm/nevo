import { createRouter, createWebHashHistory } from 'vue-router'
import maindashboard from '../views/maindashboard/index.vue'
// import DevicesPage from "../views/DevicesPage/index.vue";
// import PackagesPage from "../views/PackagesPage/index.vue";
import plantdashboard from '../views/plantdashboard/index.vue'
// import RoomsPage from "../views/RoomsPage/index.vue";
// import SettingsPage from "../views/SettingsPage/index.vue";

// import General from "../views/SettingsPage/General.vue";
// import Serverinfo from "../views/SettingsPage/Server.vue";
// import Calendar from "../views/SettingsPage/Calendar.vue";
// import Spotify from "../views/SettingsPage/Spotify.vue";
// import AppleMusic from "../views/SettingsPage/AppleMusic.vue";
// import Speaker from "../views/SettingsPage/Speaker.vue";
// import PublicTransport from "../views/SettingsPage/PublicTransport.vue";
// import Weather from "../views/SettingsPage/Weather.vue";
// import Plants from "../views/SettingsPage/Plants.vue";
// import PackageTracking from "../views/SettingsPage/PackageTracking.vue";
// import PlantsDetail from "../views/SettingsPage/PlantsDetail.vue";

const routes = [
  {
    path: '/',
    name: 'maindashboard',
    component: maindashboard
  },
  {
    path: '/plantdashboard',
    name: 'plantdashboard',
    component: plantdashboard
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
