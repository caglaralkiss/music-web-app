import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import i18n from './i18n'
import { loadIcons } from '@/font-awesome'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { MessagesPlugin } from '@/plugins/message'

loadIcons()

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(MessagesPlugin)

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state))
})

new Vue({
  router,
  store,
  beforeCreate() {
    this.$store.commit('initStore')
  },
  i18n,
  render: h => h(App)
}).$mount('#app')
