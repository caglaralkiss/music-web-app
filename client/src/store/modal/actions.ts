import { ActionTree } from 'vuex'
import { RootState } from '@/store/types'
import { ModalConfig, ModalState } from '@/store/modal/types'

export const actions: ActionTree<ModalState, RootState> = {
  openModal({ dispatch, commit }, modalConfig: ModalConfig): any {
    console.log('lololo')
    commit('injectComponent', modalConfig)
    commit('setVisibility', true)
  },
  async closeModal({ commit }): Promise<any> {
    commit('setVisibility', false)
    commit('ejectComponent')
  }
}
