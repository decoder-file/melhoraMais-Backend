import { LoginDTO, LoginResponseDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { environment } from '@/main/config'
import { UserRepository } from '@/repositories'
import { UserEntity } from '@/repositories/entities'

import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

export class LoginService {
  constructor (private readonly userRepository: UserRepository) {}

  async login (params: LoginDTO): Promise<LoginResponseDTO> {
    const { email, password } = params
    const user = await this.userRepository.findByEmail(email)
    if (!user) throw new RequestError('Usuário/senha inválido.')
    return await this.checkPassword(password, user)
  }

  private async checkPassword (password: string, user: UserEntity): Promise<LoginResponseDTO> {
    const passwordMatched = await compare(password, user.password)
    if (!passwordMatched) throw new RequestError('Usuário/senha inválido.')
    const access_token = sign({}, String(environment.jwt.secret), {
      subject: user.id,
      expiresIn: environment.jwt.expiresIn
    })
    const userEmail = user.email
    const refresh_token = sign({ userEmail }, String(environment.jwt.refreshSecretToken), {
      subject: user.id,
      expiresIn: environment.jwt.refreshTokenExpiresIn
    })
    return {
      access_token,
      refresh_token
    }
  }
}
