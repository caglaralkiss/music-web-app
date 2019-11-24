import { PagedResult, Song } from '@/interfaces'
import { AxiosResponse } from 'axios'
import { Api } from '@/api/axios'
import { Endpoint } from '@/config'

export function getSongs(params: {
  pageNum: number,
  offset: number,
  search?: string
}): Promise<AxiosResponse<PagedResult<Song>>> {
  return Api.request({
    url: Endpoint.SONG,
    method: 'get',
    params
  })
}
