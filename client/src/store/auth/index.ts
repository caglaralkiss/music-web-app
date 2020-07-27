import { RootState } from '@/store/types'
import { Module } from 'vuex'
import { AuthState } from '@/store/auth/types'
import { getters } from '@/store/auth/getters'
import { actions } from '@/store/auth/actions'
import { mutations } from '@/store/auth/mutations'

export const state: AuthState = {
  isAuthenticated: false,
  email: null,
  token: null,
  error: null
}

const namespaced: boolean = true

export const auth: Module<AuthState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
