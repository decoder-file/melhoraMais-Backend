import { randomUUID } from 'node:crypto'

import { UserDTO } from '@/dtos'

export class UserModel {
  id?: string
  name: string
  email: string
  password: string
  created_at: Date
  updated_at: Date | null

  constructor (user: UserDTO) {
    if (!this.id) randomUUID()
    this.name = user.name
    this.email = user.email
    this.password = user.password
    this.created_at = new Date()
    this.updated_at = null
  }
}
