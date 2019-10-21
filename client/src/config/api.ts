import { currEnvironment, Environment } from '@/config/environment'

const RECORD_API_BY_ENV: Record<Environment, string> = {
  [Environment.DEV]: 'http://localhost:3000/',
  [Environment.PROD]: 'http://localhost:4000',
  [Environment.TEST]: 'http://localhost:5000'
}

export const API_URL = RECORD_API_BY_ENV[currEnvironment()]
