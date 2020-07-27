import { RouteConfig } from 'vue-router'
import Shell from '@/views/Shell.vue'
import store from '@/store'

const route: RouteConfig = {
  path: '/',
  name: 'shell',
  component: Shell,
  beforeEnter: async (to, from, next) => {
    try {
      await store.dispatch('auth/checkAuth')

      next()
    } catch (e) {
      next('/auth/login')
    }
  },
  redirect: 'home',
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
    },
    {
      path: 'upload',
      name: 'upload',
      component: () => import(/* webpackChunkName: "upload" */ '../components/UploadSong.vue')
    }
  ]
}

export default route
