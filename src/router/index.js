import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard-page',
      component: require('../pages/DashboardPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})