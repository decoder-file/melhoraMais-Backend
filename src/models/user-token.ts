import { randomUUID } from 'crypto'

import { UserTokenDTO } from '@/dtos'

export class UserTokenModel {
  id: string
  userId: string
  refreshToken: string
  expiresDate: Date
  createdAt: Date

  constructor (user: UserTokenDTO) {
    this.id = randomUUID()
    this.userId = user.userId
    this.refreshToken = user.refreshToken
    this.expiresDate = user.expiresDate
    this.createdAt = new Date()
  }
}
