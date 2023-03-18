
import { RequestError } from '@/errors'
import { DateFNSProvider } from '@/providers'
import { UserTokenEntity } from '@/repositories/entities'
import { UserRepository, UsersTokensRepository } from '@/repositories'

import { hash } from 'bcryptjs'

export class ResetUsersPasswordService {
  constructor (
    private readonly usersRepository: UserRepository,
    private readonly usersTokensRepository: UsersTokensRepository,
    private readonly dateProvider: DateFNSProvider
  ) {}

  async execute (token: string, password: string): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token)
    if (!userToken) throw new RequestError('Token inválido.')
    await this.isExpiredToken(userToken)
    const user = await this.usersRepository.findById(userToken.userId)
    if (!user) throw new RequestError('Usuário não existe.')
    user.password = await hash(password, 8)
    await this.usersRepository.update(user)
    await this.usersTokensRepository.delete(userToken.id)
  }

  private async isExpiredToken (userToken: UserTokenEntity): Promise<void> {
    const isTokenExpired = this.dateProvider.compareIfBefore(userToken.expiresDate, new Date())
    if (isTokenExpired) {
      await this.usersTokensRepository.delete(userToken.id)
      throw new RequestError('Token expirado.')
    }
  }
}
