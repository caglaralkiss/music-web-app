import { GetterTree } from 'vuex'
import { ModalName, ModalState } from '@/store/modal/types'
import { RootState } from '@/store/types'

export const getters: GetterTree<ModalState, RootState> = {
  isVisible(state): boolean {
    return state.isVisible
  },
  modalName(state): ModalName {
    return state.modalComponent.name
  },
  modalProps(state): Record<string, any> | {} {
    return state.modalComponent.props
  }
}
