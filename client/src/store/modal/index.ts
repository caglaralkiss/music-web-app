import { Module } from 'vuex'
import { RootState } from '@/store/types'
import { actions } from '@/store/modal/actions'
import { mutations } from '@/store/modal/mutations'
import { getters } from '@/store/modal/getters'
import { ModalState } from '@/store/modal/types'

export const state: ModalState = {
  isVisible: false,
  modalComponent: {
    name: null,
    props: {}
  }
}

const namespaced: boolean = true

export const modal: Module<ModalState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
