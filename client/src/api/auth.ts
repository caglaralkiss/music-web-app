import { Api } from './axios'
import { Endpoint } from '@/config'
import { UserSubmit } from '@/interfaces'
import { AxiosResponse } from 'axios'

export const TOKEN_KEY = 'T0K3N'

export function setToken(jwt: string) {
  window.sessionStorage.setItem(TOKEN_KEY, jwt)
  Api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
}

export function clearToken() {
  window.sessionStorage.removeItem(TOKEN_KEY)
  delete Api.defaults.headers.common['Authorization']
}

export function login(user: UserSubmit): Promise<AxiosResponse<{ token: string }>> {
  return Api.request({
    url: Endpoint.AUTH,
    method: 'post',
    data: user
  })
}
