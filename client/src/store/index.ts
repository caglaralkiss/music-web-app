import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from '@/store/types'
import { player } from '@/store/player'
import { modal } from '@/store/modal'
import { auth } from '@/store/auth'
import { version } from '../../package.json'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    language: 'en',
    version
  },
  modules: {
    player,
    modal,
    auth
  },
  mutations: {
    initStore(state) {
      if (localStorage.getItem('store')) {
        let store = JSON.parse(localStorage.getItem('store')!)

        if (store.version === version) {
          this.replaceState(Object.assign(store, state))
        } else {
          state.version = version
        }
      }
    }
  }
}

export default new Vuex.Store<RootState>(store)
