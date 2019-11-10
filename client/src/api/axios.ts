import axios, { AxiosResponse } from 'axios'
import { API_URL } from '@/config'

export const Api = axios.create({
  baseURL: API_URL
})

export function isSuccessfulHttpRequest(response: AxiosResponse) {
  return !!(response.status >= 200 && response.status < 300 && response.data)
}

export function extractErrorMessage(response: AxiosResponse) {
  return response.data.Error
}
