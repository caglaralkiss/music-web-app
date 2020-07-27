import { BaseEntity } from '@/interfaces/base-entity'

export interface User extends BaseEntity<string>{
  name: string,
  surname: string
  email: string,
}
