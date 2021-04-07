import Vue from "vue";
import Router from "vue-router";
import DevicessPage from "../pages/DevicesPage";
import LampsPage from "../pages/LampsPage";
import PlantsPage from "../pages/PlantsPage";
import PackagesPage from "../pages/PackagesPage";
import SettingsPage from "../pages/SettingsPage";
import SpotifyCallback from "../components/Callbacks/SpotifyCallback.vue";
import DashboardPage from "../pages/DashboardPage";

Vue.use(Router);

export default new Router({
  mode: 'history',
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
      path: "/LampsPage",
      name: "lamps-page",
      component: LampsPage,
    },
    {
      path: "/DevicessPage",
      name: "devices-page",
      component: DevicessPage,
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
    },
    {
      path: "/SpotifyCallback",
      name: "spotify-callback",
      component: SpotifyCallback,
    },
  ],
});
