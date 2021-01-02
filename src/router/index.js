import { createRouter, createWebHistory } from 'vue-router'
import DevicessPage from '../pages/DevicesPage'
import LampsPage from '../pages/LampsPage'
import PlantsPage from '../pages/PlantsPage'
import PackagesPage from '../pages/PackagesPage'
import SettingsPage from '../pages/SettingsPage'
import DashboardPage from '../pages/DashboardPage'

const routes = [
  {
    path: '/',
    name: 'dashboard-page',
    component: DashboardPage
  },
  {
    path: '/DashboardPage',
    name: 'dashboard-page',
    component: DashboardPage
  },
  {
    path: '/LampsPage',
    name: 'lamps-page',
    component: LampsPage,
  },
  {
    path: '/DevicessPage',
    name: 'devices-page',
    component: DevicessPage,
  },
  {
    path: '/PlantsPage',
    name: 'plants-page',
    component: PlantsPage,
  },
  {
    path: '/PackagesPage',
    name: 'packages-page',
    component: PackagesPage,
  },
  {
    path: '/SettingsPage',
    name: 'settings-page',
    component: SettingsPage,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
