import { MutationTree } from 'vuex'
import { ModalConfig, ModalState } from '@/store/modal/types'

export const mutations: MutationTree<ModalState> = {
  setVisibility(state, payload: boolean) {
    state.isVisible = payload
  },
  injectComponent(state, payload: ModalConfig) {
    state.modalComponent = {
      name: payload.modalName,
      props: payload.props ? payload.props : {}
    }
  },
  ejectComponent(state) {
    state.modalComponent = {
      name: null,
      props: {}
    }
  }
}
