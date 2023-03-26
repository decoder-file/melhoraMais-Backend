import { CalculationModel } from '@/models'
import { dbSource } from '@/repositories/pg-connection'
import { CalculationEntity } from '@/repositories/entities'
import { CalculationDTO } from '@/dtos'

import { Repository } from 'typeorm'

export class CalculationRepository {
  private readonly calculations: Repository<CalculationEntity>

  constructor () {
    this.calculations = dbSource.getRepository(CalculationEntity)
  }

  async getByUser (userId: string): Promise<CalculationEntity[]> {
    return await this.calculations.find({
      where: { userId }
    })
  }

  async create (params: CalculationDTO, userId: string): Promise<void> {
    const calculation = new CalculationModel(params, userId)
    await this.calculations.save(calculation)
  }

  async update (calculation: CalculationModel): Promise<void> {
    await this.calculations.update({ id: calculation.id }, calculation)
  }

  async delete (id: string): Promise<void> {
    await this.calculations.delete(id)
  }

  async findById (id: string): Promise<CalculationEntity | null> {
    return await this.calculations.findOneBy({ id })
  }

  async upsert (data: CalculationModel[]): Promise<void> {
    await this.calculations.upsert(data, { conflictPaths: ['id'] })
  }
}
