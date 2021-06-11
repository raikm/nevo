import { createRouter, createWebHistory } from "vue-router";
import DashboardPage from "../views/DashboardPage/index.vue";
import DevicesPage from "../views/DevicesPage/index.vue";
import PackagesPage from "../views/PackagesPage/index.vue";
import PlantsPage from "../views/PlantsPage/index.vue";
import RoomsPage from "../views/RoomsPage/index.vue";
import SettingsPage from "../views/SettingsPage/index.vue";

import General from "../views/SettingsPage/General.vue";
import Serverinfo from "../views/SettingsPage/Server.vue";
import Calendar from "../views/SettingsPage/Calendar.vue";
import Spotify from "../views/SettingsPage/Spotify.vue";
import AppleMusic from "../views/SettingsPage/AppleMusic.vue";
import Speaker from "../views/SettingsPage/Speaker.vue";
import PublicTransport from "../views/SettingsPage/PublicTransport.vue";
import Weather from "../views/SettingsPage/Weather.vue";
import Plants from "../views/SettingsPage/Plants.vue";
import PackageTracking from "../views/SettingsPage/PackageTracking.vue";
import PlantsDetail from "../views/SettingsPage/PlantsDetail.vue";


const routes = [
    {
      path: "/",
      name: "dashboard-page",
      component: DashboardPage,
    },
    {
      path: "/DashboardPage",
      name: "dashboard-page",
      component: DashboardPage,
    },
    {
      path: "/DevicessPage",
      name: "devices-page",
      component: DevicesPage,
    },
    {
      path: "/RoomsPage",
      name: "room-page",
      component: RoomsPage,
    },
    {
      path: "/PlantsPage",
      name: "plants-page",
      component: PlantsPage,
    },
    {
      path: "/PackagesPage",
      name: "packages-page",
      component: PackagesPage,
    },
    {
      path: "/SettingsPage",
      name: "settings-page",
      component: SettingsPage,
      children: [
        {
          path: "General",
          name: "general",
          component: General,
        },
        {
          path: "Server",
          name: "server",
          component: Serverinfo,
        },
        {
          path: "Calendar",
          name: "calendar",
          component: Calendar,
        },
        {
          path: "Spotify",
          name: "spotify",
          component: Spotify,
        },
        {
          path: "AppleMusic",
          name: "applemusic",
          component: AppleMusic,
        },
        {
          path: "Speaker",
          name: "speaker",
          component: Speaker,
        },
        {
          path: "PublicTransport",
          name: "publictransport",
          component: PublicTransport,
        },
        {
          path: "Weather",
          name: "weather",
          component: Weather,
        },
        {
          path: "Plants",
          name: "plants",
          component: Plants,
        },
        {
          path: "PlantsDetail",
          name: "plantsdetail",
          component: PlantsDetail,
        },
        {
          path: "PackageTracking",
          name: "packagetracking",
          component: PackageTracking,
        },
      ],
    },
  ]


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;