import { GetterTree } from 'vuex'
import { RootState } from '@/store/types'
import { AuthState } from '@/store/auth/types'

export const getters: GetterTree<AuthState, RootState> = {
  isAuthenticated(state): boolean {
    return state.isAuthenticated
  },
  email(state): string | null {
    return state.email
  },
  token(state): string | null {
    return state.token
  },
  error(state): string | null {
    return state.error
  }
}
