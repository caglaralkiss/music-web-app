import { RouteConfig } from 'vue-router'
import Shell from '@/views/Shell.vue'

const route: RouteConfig = {
  path: '/',
  name: 'shell',
  component: Shell,
  children: [
    {
      path: 'search',
      name: 'search',
      component: () => import(/* webpackChunkName: "search" */ '../components/Search.vue')
    },
    {
      path: 'home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '../components/Home.vue')
    }
  ]
}

export default route
