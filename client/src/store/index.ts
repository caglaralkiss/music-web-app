import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from '@/store/types'
import { player } from '@/store/player'
import { modal } from '@/store/modal'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    language: 'en'
  },
  modules: {
    player,
    modal
  }
}

export default new Vuex.Store<RootState>(store)
