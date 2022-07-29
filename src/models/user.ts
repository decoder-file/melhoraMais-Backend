import { randomUUID } from 'node:crypto'

type UserData = UserModel

export class UserModel {
  id?: string
  name: string
  email: string
  password: string
  created_at: Date
  updated_at: Date | null

  constructor (user: UserData) {
    if (!this.id) randomUUID()
    this.name = user.name
    this.email = user.email
    this.password = user.password
    this.created_at = new Date()
    this.updated_at = null
  }
}

export type CreateUserDTO = Omit<UserModel, 'id'|'created_at'|'updated_at'>
