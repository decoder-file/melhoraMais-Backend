import { CalculationModel } from '@/models'
import { CalculationDTO, SyncCalculationDTO } from '@/dtos'

export const mockCalculation: CalculationDTO = {
  tag: 'any-tag',
  title: 'any-title',
  description: 'any-description',
  bash: 'any-bash',
  entranceWeight: 'any-entranceWeight',
  dailyCost: 'any-dailyCost',
  gmd: 'any-gmd',
  purchasePrice: 'any-purchasePrice',
  lengthOfStay: 'any-lengthOfStay',
  outputWeight: 'any-outputWeight',
  rcInitial: 'any-rcInitial',
  rcEnd: 'any-rcEnd',
  salePrice: 'any-salePrice',
  producedPrice: 'any-producedPrice',
  returnOnCapital: 'any-returnOnCapital',
  result: 'any-result'
}

export const mockCalculationSync: SyncCalculationDTO = {
  id: 'any-id',
  userId: 'any-userId',
  tag: 'any-tag',
  title: 'any-title',
  description: 'any-description',
  bash: 'any-bash',
  entranceWeight: 'any-entranceWeight',
  dailyCost: 'any-dailyCost',
  gmd: 'any-gmd',
  purchasePrice: 'any-purchasePrice',
  lengthOfStay: 'any-lengthOfStay',
  outputWeight: 'any-outputWeight',
  rcInitial: 'any-rcInitial',
  rcEnd: 'any-rcEnd',
  salePrice: 'any-salePrice',
  producedPrice: 'any-producedPrice',
  returnOnCapital: 'any-returnOnCapital',
  result: 'any-result',
  createdAt: new Date('2022-08-01'),
  updatedAt: new Date('2022-08-01')
}

export const calculationModel: CalculationModel = {
  id: 'any-id',
  userId: 'any-userId',
  tag: 'any-tag',
  title: 'any-title',
  description: 'any-description',
  bash: 'any-bash',
  entranceWeight: 'any-entranceWeight',
  dailyCost: 'any-dailyCost',
  gmd: 'any-gmd',
  purchasePrice: 'any-purchasePrice',
  lengthOfStay: 'any-lengthOfStay',
  outputWeight: 'any-outputWeight',
  rcInitial: 'any-rcInitial',
  rcEnd: 'any-rcEnd',
  salePrice: 'any-salePrice',
  producedPrice: 'any-producedPrice',
  returnOnCapital: 'any-returnOnCapital',
  result: 'any-result',
  createdAt: new Date('2022-08-01'),
  updatedAt: new Date('2022-08-01')
}
