import { UserTokenEntity } from '@/repositories/entities'
import { dbSource } from '@/repositories/pg-connection'

import { Repository } from 'typeorm'

export class UsersTokensRepository {
  private readonly usersTokens: Repository<UserTokenEntity>

  constructor () {
    this.usersTokens = dbSource.getRepository(UserTokenEntity)
  }

  async create (params: any): Promise<void> {
    await this.usersTokens.save(params)
  }

  async delete (id: string): Promise<void> {
    await this.usersTokens.delete(id)
  }

  async findByRefreshToken (refreshToken: string): Promise<UserTokenEntity | null> {
    return await this.usersTokens.findOne({
      where: { refreshToken }
    })
  }
}
