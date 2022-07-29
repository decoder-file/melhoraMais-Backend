import { TagCalculationModel } from '@/models'
import { TagCalculationDTO } from '@/dtos'

export const mockTagCalculation: TagCalculationDTO = {
  title: 'any-title',
  color: 'any-color'
}

export const tagCalculationModel: TagCalculationModel = {
  id: 'any-id',
  title: 'any-title',
  color: 'any-color',
  created_at: new Date('2022-08-01')
}