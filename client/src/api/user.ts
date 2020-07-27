import { AxiosResponse } from 'axios'
import { Api } from '@/api/axios'
import { Endpoint } from '@/config'
import { User } from '../../../server/src/domain'

export function getUser(email: string): Promise<AxiosResponse<{ user: User }>> {
  return Api.request({
    url: Endpoint.USER,
    method: 'get',
    params: { id: email }
  })
}

export function getUsers(): Promise<AxiosResponse<Array<User>>> {
  return Api.request({
    url: Endpoint.USER,
    method: 'get'
  })
}
