import { CalculationDTO } from '@/dtos'
import { RequestError } from '@/errors'
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

  async create (params: CalculationDTO): Promise<void> {
    await this.calculationRepository.create(params)
  }

  async update (id: string, params: CalculationDTO): Promise<void> {
    const calculationExists = await this.calculationRepository.findById(id)
    if (!calculationExists) throw new RequestError('Calculation não existe.')
    await this.calculationRepository.update(calculationExists.id, params)
  }

  async delete (id: string): Promise<void> {
    const calculation = await this.calculationRepository.findById(id)
    if (!calculation) throw new RequestError('Calculation não existe.')
    await this.calculationRepository.delete(calculation.id)
  }
}