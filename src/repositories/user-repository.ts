import { randomUUID } from 'node:crypto'

import { UserDTO } from '@/dtos'
import { UserEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

import { Repository } from 'typeorm'

export class UserRepository {
  private readonly users: Repository<UserEntity>

  constructor () {
    this.users = mysqlSource.getRepository(UserEntity)
  }

  async get (): Promise<UserEntity[]> {
    return await this.users.find()
  }

  async create (params: UserDTO): Promise<void> {
    await this.users.save({
      id: randomUUID(),
      ...params
    })
  }

  async update (user: UserEntity, params: UserDTO): Promise<void> {
    await this.users.update({ id: user.id }, {
      updatedAt: new Date(),
      ...params
    })
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
