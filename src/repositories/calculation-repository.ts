import { CalculationModel, CreateCalculationDTO } from '@/models'
import { mysqlSource } from '@/repositories/mysql-connection'
import { CalculationEntity } from '@/repositories/entities'

import { Repository } from 'typeorm'
import { CalculationDTO } from '@/dtos'

export class CalculationRepository {
  private readonly calculations: Repository<CalculationEntity>

  constructor () {
    this.calculations = mysqlSource.getRepository(CalculationEntity)
  }
  
  async get (): Promise<CalculationEntity[]> {
    return await this.calculations.find()
  }

  async create (params: CalculationDTO): Promise<void> {
    const calculation = new CalculationModel(params)
    await this.calculations.save(calculation)
  }

  async update (calculationId: string, params: CalculationDTO): Promise<void> {
    await this.calculations.update({ id: calculationId }, {
      updated_at: new Date(),
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