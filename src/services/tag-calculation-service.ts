import { TagCalculationDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { TagCalculationModel } from '@/models'
import { TagCalculationRepository } from '@/repositories'
import { TagCalculationEntity } from '@/repositories/entities'

export class TagCalculationService {
  constructor (private readonly tagCalculationRepository: TagCalculationRepository) {}

  async get (): Promise<TagCalculationEntity[]> {
    return await this.tagCalculationRepository.get()
  }

  async getById (id: string): Promise<TagCalculationEntity | null> {
    return await this.tagCalculationRepository.findById(id)
  }

  async create (params: TagCalculationDTO): Promise<void> {
    await this.tagCalculationRepository.create(params)
  }

  async update (id: string, params: TagCalculationDTO): Promise<void> {
    const tagCalculationExists = await this.tagCalculationRepository.findById(id)
    if (!tagCalculationExists) throw new RequestError('TagCalculation não existe.')
    const tagCalculation = new TagCalculationModel(params)
    const tagCalculationToUpdate = {
      ...tagCalculation,
      id: tagCalculationExists.id,
      updated_at: new Date()
    }
    await this.tagCalculationRepository.update(tagCalculationToUpdate)
  }

  async delete (id: string): Promise<void> {
    const tagCalculation = await this.tagCalculationRepository.findById(id)
    if (!tagCalculation) throw new RequestError('TagCalculation não existe.')
    await this.tagCalculationRepository.delete(tagCalculation.id)
  }
}
