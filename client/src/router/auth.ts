import { RouteConfig } from 'vue-router/types/router'
import Auth from '@/views/Auth.vue'

const route: RouteConfig = {
  path: '/auth',
  component: Auth,
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
