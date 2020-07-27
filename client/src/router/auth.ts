import { RouteConfig } from 'vue-router/types/router'
import Auth from '@/views/Auth.vue'
import store from '@/store'

const route: RouteConfig = {
  path: '/auth',
  component: Auth,
  beforeEnter: async (to, from, next) => {
    try {
      await store.dispatch('auth/checkAuth')

      next('/home')
    } catch (e) {
      next()
    }
  },
  redirect: 'auth/login',
  children: [
    {
      path: 'login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../components/Login.vue')
    },
    {
      path: 'register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ '../components/Register.vue')
    }
  ]
}

export default route
