import { TagCalculationModel } from '@/models'
import { mysqlSource } from '@/repositories/mysql-connection'
import { TagCalculationEntity } from '@/repositories/entities'
import { TagCalculationDTO } from '@/dtos'

import { Repository } from 'typeorm'

export class TagCalculationRepository {
  private readonly tagCalculations: Repository<TagCalculationEntity>

  constructor () {
    this.tagCalculations = mysqlSource.getRepository(TagCalculationEntity)
  }

  async get (): Promise<TagCalculationEntity[]> {
    return await this.tagCalculations.find()
  }

  async create (params: TagCalculationDTO): Promise<void> {
    const tagCalculation = new TagCalculationModel(params)
    await this.tagCalculations.save(tagCalculation)
  }

  async update (tagCalculation: TagCalculationEntity, params: TagCalculationDTO): Promise<void> {
    const tagCalculationObject = new TagCalculationModel(params)
    await this.tagCalculations.update({ id: tagCalculation.id }, {
      updated_at: new Date(),
      ...tagCalculationObject
    })
  }

  async delete (id: string): Promise<void> {
    await this.tagCalculations.delete(id)
  }

  async findById (id: string): Promise<TagCalculationEntity | null> {
    return await this.tagCalculations.findOneBy({ id })
  }
}
