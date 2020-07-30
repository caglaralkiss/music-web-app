import { PagedResult, Song } from '@/interfaces'
import { AxiosResponse } from 'axios'
import { Api } from '@/api/axios'
import { Endpoint } from '@/config'

interface SongRequest {
  title: string,
  album: string,
  artist: Array<String>
  cover: File,
  audio: File,
  owner: string
}

export function getSong(params: { id: string }): Promise<AxiosResponse<Song>> {
  return Api.request({
    url: Endpoint.SONG,
    method: 'get',
    params
  })
}

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

export function postSong(req: SongRequest): Promise<AxiosResponse<void>> {
  return Api.request({
    url: Endpoint.SONG,
    method: 'post',
    data: createFormData(req),
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function deleteSong(params: { id: string }): Promise<AxiosResponse<void>> {
  return Api.request({
    url: Endpoint.SONG,
    method: 'delete',
    params
  })
}

function createFormData(data: SongRequest) {
  const formData = new FormData()

  Object.entries(data)
    .forEach(([key, value]) => formData.append(key, value))

  return formData
}
