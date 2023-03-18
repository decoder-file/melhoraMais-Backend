import { randomUUID } from 'crypto'

import { UserTokenDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { UserRepository } from '@/repositories'
import { UserEntity } from '@/repositories/entities'
import { forgotMailUrl, templatePath } from '@/main/config'

import { addHours } from 'date-fns'
import { UserTokenModel } from '@/models'
import { UsersTokensRepository } from '@/repositories/user-token-repository'
import { SendMailService } from '@/services'

export type GenericObject = {
  [key: string]: any
}

export class ForgotPasswordService {
  constructor (
    private readonly usersRepository: UserRepository,
    private readonly usersTokensRepository: UsersTokensRepository,
    private readonly mailService: SendMailService
  ) {}

  async execute (email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new RequestError('Usuário não existe.')
    const data = this.generateUserTokenData(user)
    const userToken = new UserTokenModel(data)
    const resetPasswordLink = this.generateLink(userToken.refreshToken)
    await this.usersTokensRepository.create(userToken)
    const mailData = { resetPasswordLink, ...user }
    await this.mailService.execute(templatePath, mailData, 'Agro API - Esqueci minha senha')
  }

  private generateRefreshToken (): string {
    return randomUUID()
  }

  private generateUserTokenData (user: UserEntity): UserTokenDTO {
    const expiresDate = addHours(new Date(), 2)
    const refreshToken = this.generateRefreshToken()
    return {
      refreshToken,
      expiresDate,
      userId: user.id
    }
  }

  private generateLink (refreshToken: string): string {
    const link = `${forgotMailUrl}?token=${String(refreshToken)}`
    return link
  }
}
