import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import i18n from './i18n'
import { loadFonts } from '@/font-awesome'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { MessagesPlugin } from '@/plugins/message'

loadFonts()

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(MessagesPlugin)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
