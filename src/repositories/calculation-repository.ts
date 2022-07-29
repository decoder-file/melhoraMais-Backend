import { CreateCalculationDTO } from '@/models'
import { mysqlSource } from '@/repositories/mysql-connection'
import { CalculationEntity } from '@/repositories/entities'

import { Repository } from 'typeorm'

export class CalculationRepository {
  private readonly calculations: Repository<CalculationEntity>

  constructor () {
    this.calculations = mysqlSource.getRepository(CalculationEntity)
  }
  
  async get (): Promise<CalculationEntity[]> {
    return await this.calculations.find()
  }

  async create (params: CreateCalculationDTO): Promise<void> {
    await this.calculations.save(params)
  }

  async update (calculationId: string, params: CreateCalculationDTO): Promise<void> {
    await this.calculations.update({ id: calculationId }, {
      updatedAt: new Date(),
      ...params
    })
  }

  async delete (id: string): Promise<void> {
    await this.calculations.delete(id)
  }

  async findById (id: string): Promise<CalculationEntity | null> {
    return await this.calculations.findOneBy({ id })
  }
}