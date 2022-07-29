import { RequestError } from '@/errors'
import { CalculationModel, CreateCalculationDTO } from '@/models'
import { CalculationRepository } from '@/repositories'
import { CalculationEntity } from '@/repositories/entities'

export class CalculationService {
  constructor (private readonly calculationRepository: CalculationRepository) {}

  async get (): Promise<CalculationEntity[]> {
    return await this.calculationRepository.get()
  }

  async getById (id: string): Promise<CalculationEntity | null> {
    return await this.calculationRepository.findById(id)
  }

  async create (params: CreateCalculationDTO): Promise<void> {
    const calculation = new CalculationModel(params)
    await this.calculationRepository.create(calculation)
  }

  async update (id: string, params: CreateCalculationDTO): Promise<void> {
    const calculation = await this.calculationRepository.findById(id)
    if (!calculation) throw new RequestError('Calculation não existe.')
    await this.calculationRepository.update(calculation.id, params)
  }

  async delete (id: string): Promise<void> {
    const calculation = await this.calculationRepository.findById(id)
    if (!calculation) throw new RequestError('Calculation não existe.')
    await this.calculationRepository.delete(calculation.id)
  }
}