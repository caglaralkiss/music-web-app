import { Api } from './axios'
import { Endpoint } from '@/config'
import { LoginSubmit, RegisterSubmit } from '@/interfaces'
import { AxiosResponse } from 'axios'

export const setTokenHeader = (token: string) => { Api.defaults.headers.common['Authorization'] = `Bearer ${token}` }
export const purgeTokenHeader = () => { delete Api.defaults.headers.common['Authorization'] }

export function login(user: LoginSubmit): Promise<AxiosResponse<{ token: string }>> {
  return Api.request({
    url: Endpoint.AUTH,
    method: 'post',
    data: user
  })
}

export function register(user: RegisterSubmit): Promise<AxiosResponse<void>> {
  return Api.request({
    url: Endpoint.USER,
    method: 'post',
    data: user
  })
}
