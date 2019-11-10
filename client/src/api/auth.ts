import { Api } from './axios'
import { Endpoint } from '@/config'
import { UserSubmit } from '@/interfaces'

export function setToken(jwt: string) {
  Api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
}

export function clearToken() {
  delete Api.defaults.headers.common['Authorization']
}

export function login(user: UserSubmit): Promise<{ token: string } | { Error: string }> {
  return Api.request<UserSubmit, { token: string }>({
    url: Endpoint.AUTH,
    method: 'post',
    data: user
  })
}
