import { UserDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { env } from '@/main/config/env'
import { UserRepository } from '@/repositories'
import { UserEntity } from '@/repositories/entities'
import { hash } from 'bcryptjs'

export class UserService {
  constructor (private readonly userRepository: UserRepository) {}

  async get (): Promise<UserEntity[]> {
    return this.userRepository.get()
  }

  async getById (id: string): Promise<UserEntity | null> {
    return await this.userRepository.findById(id)
  }

  async create (params: UserDTO): Promise<void> {
    const { email, password } = params
    const user = await this.userRepository.findByEmail(email)
    if (user) throw new RequestError('Usuário já existe.')
    const userToCreate = { ...params, password: await this.encrypt(password) }
    await this.userRepository.create(userToCreate)
  }

  async update (id: string, params: UserDTO): Promise<void> {
    const user = await this.userRepository.findById(id)
    if (!user) throw new RequestError('Usuário não existe.')
    await this.userRepository.update(user, params)
  }

  async delete (id: string): Promise<void> {
    const user = await this.userRepository.findById(id)
    if (!user) throw new RequestError('Usuário não existe.')
    await this.userRepository.delete(user.id)
  }

  public async encrypt (password: string): Promise<string> {
    return hash(password, env.encrypt.salt);
  }
}