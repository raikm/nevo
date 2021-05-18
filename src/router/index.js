import Vue from "vue";
import Router from "vue-router";
import DevicesPage from "../pages/DevicesPage";
import PlantsPage from "../pages/PlantsPage";
import PackagesPage from "../pages/PackagesPage";
import DashboardPage from "../pages/DashboardPage";
import SettingsPage from "../pages/SettingsPage";
import RoomsPage from "../pages/RoomsPage";
import General from "../pages/SettingsPage/General.vue";
import Serverinfo from "../pages/SettingsPage/Server.vue";
import Calendar from "../pages/SettingsPage/Calendar.vue";
import Spotify from "../pages/SettingsPage/Spotify.vue";
import AppleMusic from "../pages/SettingsPage/AppleMusic.vue";
import Speaker from "../pages/SettingsPage/Speaker.vue";
import PublicTransport from "../pages/SettingsPage/PublicTransport.vue";
import Weather from "../pages/SettingsPage/Weather.vue";
import Plants from "../pages/SettingsPage/Plants.vue";
import PackageTracking from "../pages/SettingsPage/PackageTracking.vue";
import PlantsDetail from "../pages/SettingsPage/PlantsDetail.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
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
  ],
});
