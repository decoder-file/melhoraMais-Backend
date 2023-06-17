import { randomUUID } from 'crypto'

import { UserDTO } from '@/dtos'

export class UserModel {
  id?: string
  name: string
  email: string
  password: string
  location: string
  created_at: Date
  updated_at: Date | null

  constructor (user: UserDTO) {
    if (!this.id) {
      this.id = randomUUID()
    }
    this.name = user.name
    this.email = user.email
    this.password = user.password
    this.location = user.location
    this.created_at = user.created_at ?? new Date()
    this.updated_at = null
  }
}
