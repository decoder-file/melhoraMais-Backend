import { UserDTO } from '@/dtos'
import { UserEntity } from '@/repositories/entities'
import { dbSource } from '@/repositories/pg-connection'

import { Repository } from 'typeorm'

export class UserRepository {
  private readonly users: Repository<UserEntity>

  constructor () {
    this.users = dbSource.getRepository(UserEntity)
  }

  async get (): Promise<UserEntity[]> {
    return await this.users.find({
      select: [
        'id', 'name', 'email', 'location', 'created_at', 'updated_at'
      ]
    })
  }

  async create (params: UserDTO): Promise<void> {
    await this.users.save(params)
  }

  async update (user: UserEntity): Promise<void> {
    await this.users.update({ id: user.id }, user)
  }

  async delete (id: string): Promise<void> {
    await this.users.delete(id)
  }

  async findByEmail (email: string): Promise<UserEntity | null> {
    return this.users.findOneBy({ email })
  }

  async findById (id: string): Promise<UserEntity | null> {
    return await this.users.findOneBy({ id })
  }
}
