import { SyncTagCalculationDTO, TagCalculationDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { TagCalculationModel } from '@/models'
import { TagCalculationRepository } from '@/repositories'
import { TagCalculationEntity } from '@/repositories/entities'

export class TagCalculationService {
  constructor (private readonly tagCalculationRepository: TagCalculationRepository) {}

  async getByUser (userId: string): Promise<TagCalculationEntity[]> {
    return await this.tagCalculationRepository.getByUser(userId)
  }

  async getById (id: string): Promise<TagCalculationEntity | null> {
    return await this.tagCalculationRepository.findById(id)
  }

  async create (params: TagCalculationDTO, userId: string): Promise<void> {
    await this.tagCalculationRepository.create(params, userId)
  }

  async update (id: string, params: TagCalculationDTO): Promise<void> {
    const tagCalculationExists = await this.tagCalculationRepository.findById(id)
    if (!tagCalculationExists) throw new RequestError('TagCalculation não existe.')
    const tagCalculation = new TagCalculationModel(params, tagCalculationExists.userId)
    const tagCalculationToUpdate = {
      ...tagCalculation,
      id: tagCalculationExists.id,
      updatedAt: new Date()
    }
    await this.tagCalculationRepository.update(tagCalculationToUpdate)
  }

  async delete (id: string): Promise<void> {
    const tagCalculation = await this.tagCalculationRepository.findById(id)
    if (!tagCalculation) throw new RequestError('TagCalculation não existe.')
    await this.tagCalculationRepository.delete(tagCalculation.id)
  }

  async sync (userId: string, tagCalculationsToSync: SyncTagCalculationDTO[]): Promise<void> {
    const newTagCalculationsToSync: TagCalculationModel[] = []

    for (const item of tagCalculationsToSync) {
      const calculation = new TagCalculationModel(item, userId)
      newTagCalculationsToSync.push(calculation)
    }
    const calculations = await this.tagCalculationRepository.getByUser(userId)

    const uncommonTagCalculations = calculations.filter(obj => newTagCalculationsToSync.findIndex(i => i.id === obj.id) === -1 || newTagCalculationsToSync.findIndex(i => i.id === obj.id) === undefined)

    for (const calculationToDelete of uncommonTagCalculations) {
      await this.tagCalculationRepository.delete(calculationToDelete.id)
    }

    await this.tagCalculationRepository.upsert(newTagCalculationsToSync)
  }
}
