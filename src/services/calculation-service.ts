import { CalculationDTO, SyncCalculationDTO } from '@/dtos'
import { RequestError } from '@/errors'
import { CalculationModel } from '@/models'
import { CalculationRepository } from '@/repositories'
import { CalculationEntity } from '@/repositories/entities'

export class CalculationService {
  constructor (private readonly calculationRepository: CalculationRepository) {}

  async getByUser (userId: string): Promise<CalculationEntity[]> {
    return await this.calculationRepository.getByUser(userId)
  }

  async getById (id: string): Promise<CalculationEntity | null> {
    return await this.calculationRepository.findById(id)
  }

  async create (params: CalculationDTO, userId: string): Promise<void> {
    await this.calculationRepository.create(params, userId)
  }

  async update (id: string, params: CalculationDTO): Promise<void> {
    const calculationExists = await this.calculationRepository.findById(id)
    if (!calculationExists) throw new RequestError('Calculation não existe.')
    const calculation = new CalculationModel(params, calculationExists.userId)
    const calculationToUpdate = {
      ...calculation,
      id: calculationExists.id,
      updatedAt: new Date()
    }
    await this.calculationRepository.update(calculationToUpdate)
  }

  async delete (id: string): Promise<void> {
    const calculation = await this.calculationRepository.findById(id)
    if (!calculation) throw new RequestError('Calculation não existe.')
    await this.calculationRepository.delete(calculation.id)
  }

  async sync (userId: string, calculationsToSync: SyncCalculationDTO[]): Promise<void> {
    const newCalculationsToSync: CalculationModel[] = []

    for (const item of calculationsToSync) {
      const calculation = new CalculationModel(item, userId)
      newCalculationsToSync.push(calculation)
    }
    const calculations = await this.calculationRepository.getByUser(userId)

    const uncommonCalculations = calculations.filter(obj => newCalculationsToSync.findIndex(i => i.id === obj.id) === -1 || newCalculationsToSync.findIndex(i => i.id === obj.id) === undefined)

    for (const calculationToDelete of uncommonCalculations) {
      await this.calculationRepository.delete(calculationToDelete.id)
    }

    await this.calculationRepository.upsert(newCalculationsToSync)
  }
}
