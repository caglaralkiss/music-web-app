import axios, { AxiosResponse } from 'axios'
import { API_URL } from '@/config'
import store from '@/store'
import router from '@/router'

export const Api = axios.create({
  baseURL: API_URL
})

Api.interceptors.response.use((response: AxiosResponse) => {
  return response
}, async (error) => {
  if (error.response.data.Error === 'You are not authorized!') {
    await store.dispatch('auth/logout')
    await router.push('/auth/login')
  }
  return Promise.reject(error)
})

export function extractErrorMessage(response: AxiosResponse) {
  return response.data.Error
}
