import { ActionTree } from 'vuex'
import { RootState } from '@/store/types'
import { AuthState } from '@/store/auth/types'
import { login, register, getUser } from '@/api'
import { AxiosResponse } from 'axios'
import { extractErrorMessage } from '@/api/axios'

export const actions: ActionTree<AuthState, RootState> = {
  login({ commit }, credentials: { email: string, password: string }) {
    return new Promise<AxiosResponse>((resolve, reject) => {
      login(credentials)
        .then(response => {
          const { token } = response.data

          commit('setAuth', { token, email: credentials.email })
          resolve(response)
        })
        .catch(err => {
          const errMessage: string = extractErrorMessage(err.response)
          commit('setError', errMessage)
          reject(errMessage)
        })
    })
  },
  logout({ commit }) {
    commit('purgeAuth')
  },
  register({ commit }, credentials: { name: string, surname: string, email: string, password: string }) {
    return new Promise<AxiosResponse>((resolve, reject) => {
      register(credentials)
        .then((data) => resolve(data))
        .catch(err => {
          const errMessage = extractErrorMessage(err.response)
          commit('setError', errMessage)
          reject(errMessage)
        })
    })
  },
  checkAuth({ commit }) {
    const store = JSON.parse(localStorage.getItem('store')!)

    return new Promise<AxiosResponse>((resolve, reject) => {
      const { token, email } = store.auth

      commit('setAuth', { email, token })

      if (token && email) {
        getUser(email)
          .then(user => {
            resolve(user)
          })
          .catch(err => {
            const errMessage = extractErrorMessage(err.response)
            commit('setError', errMessage)
            commit('purgeAuth')
            reject(errMessage)
          })
      } else {
        commit('purgeAuth')
        reject(new Error('Auth Error'))
      }
    })
  }
}
