import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '@/views/Auth.vue'
import Shell from '@/views/Shell.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'shell',
    component: Shell
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
    children: [
      {
        path: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../components/Login.vue')
      },
      {
        path: 'register',
        component: () => import(/* webpackChunkName: "register" */ '../components/Register.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
