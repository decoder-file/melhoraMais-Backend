import { UserTokenDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { UserRepository } from '@/repositories'
import { UserEntity } from '@/repositories/entities'
import { templatePath } from '@/main/config'

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
    await this.usersTokensRepository.create(userToken)
    const mailData = { ...user, resetPasswordCode: userToken.refreshToken }
    await this.mailService.execute(templatePath, mailData, 'Agro API - Esqueci minha senha')
  }

  private generateRefreshToken (): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let code = ''

    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return code
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
}
