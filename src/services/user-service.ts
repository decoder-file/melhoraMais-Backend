import { RequestError } from '@/errors'
import { CreateUserDTO, UserModel } from '@/models/user'
import { UserRepository } from '@/repositories'
import { UserEntity } from '@/repositories/entities'
import { randomUUID } from 'crypto'

export class UserService {
  constructor (private readonly userRepository: UserRepository) {}

  async get (): Promise<UserEntity[]> {
    return this.userRepository.get()
  }

  async getById (id: string): Promise<UserEntity | null> {
    return await this.userRepository.findById(id)
  }

  async create (params: CreateUserDTO): Promise<void> {
    const user = await this.userRepository.findByEmail(params.email)
    if (user) throw new RequestError('Usuário já existe.')
    await this.userRepository.create(params)
  }

  async update (id: string, params: CreateUserDTO): Promise<void> {
    const user = await this.userRepository.findById(id)
    if (!user) throw new RequestError('Usuário não existe.')
    await this.userRepository.update(user, params)
  }

  async delete (id: string): Promise<void> {
    const user = await this.userRepository.findById(id)
    if (!user) throw new RequestError('Usuário não existe.')
    await this.userRepository.delete(user.id)
  }
}