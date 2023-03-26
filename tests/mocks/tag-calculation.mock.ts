import { TagCalculationModel } from '@/models'
import { SyncTagCalculationDTO, TagCalculationDTO } from '@/dtos'

export const mockTagCalculation: TagCalculationDTO = {
  title: 'any-title',
  color: 'any-color'
}

export const mockTagCalculationSync: SyncTagCalculationDTO = {
  id: 'any-id',
  title: 'any-title',
  color: 'any-color',
  userId: 'any-userId',
  createdAt: new Date('2022-08-01')
}

export const tagCalculationModel: TagCalculationModel = {
  id: 'any-id',
  userId: 'any-userId',
  title: 'any-title',
  color: 'any-color',
  createdAt: new Date('2022-08-01')
}
