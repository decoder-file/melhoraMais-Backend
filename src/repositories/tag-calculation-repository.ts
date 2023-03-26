import { TagCalculationModel } from '@/models'
import { dbSource } from '@/repositories/pg-connection'
import { TagCalculationEntity } from '@/repositories/entities'
import { TagCalculationDTO } from '@/dtos'

import { Repository } from 'typeorm'

export class TagCalculationRepository {
  private readonly tagCalculations: Repository<TagCalculationEntity>

  constructor () {
    this.tagCalculations = dbSource.getRepository(TagCalculationEntity)
  }

  async getByUser (userId: string): Promise<TagCalculationEntity[]> {
    return await this.tagCalculations.find({
      where: { userId }
    })
  }

  async create (params: TagCalculationDTO, userId: string): Promise<void> {
    const tagCalculation = new TagCalculationModel(params, userId)
    await this.tagCalculations.save(tagCalculation)
  }

  async update (tagCalculation: TagCalculationModel): Promise<void> {
    await this.tagCalculations.update({ id: tagCalculation.id }, tagCalculation)
  }

  async delete (id: string): Promise<void> {
    await this.tagCalculations.delete(id)
  }

  async findById (id: string): Promise<TagCalculationEntity | null> {
    return await this.tagCalculations.findOneBy({ id })
  }

  async upsert (data: TagCalculationModel[]): Promise<void> {
    await this.tagCalculations.upsert(data, { conflictPaths: ['id'] })
  }
}
