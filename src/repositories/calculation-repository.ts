import { CalculationModel } from '@/models'
import { mysqlSource } from '@/repositories/mysql-connection'
import { CalculationEntity } from '@/repositories/entities'
import { CalculationDTO } from '@/dtos'

import { Repository } from 'typeorm'

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

  async update (calculation: CalculationEntity): Promise<void> {
    await this.calculations.update({ id: calculation.id }, calculation)
  }

  async delete (id: string): Promise<void> {
    await this.calculations.delete(id)
  }

  async findById (id: string): Promise<CalculationEntity | null> {
    return await this.calculations.findOneBy({ id })
  }
}
