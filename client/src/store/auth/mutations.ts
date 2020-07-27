import { MutationTree } from 'vuex'
import { AuthState } from '@/store/auth/types'
import { purgeTokenHeader, setTokenHeader } from '@/api/auth'

export const mutations: MutationTree<AuthState> = {
  setAuth(state, payload: { token: string, email: string}) {
    state.isAuthenticated = true
    state.email = payload.email
    state.token = payload.token
    state.error = null
    setTokenHeader(payload.token)
  },
  setError(state, errMessage: string) {
    state.isAuthenticated = false
    state.error = errMessage
  },
  purgeAuth(state) {
    state.isAuthenticated = false
    state.token = null
    state.email = null
    state.error = null
    purgeTokenHeader()
  }
}
