import { randomUUID } from 'node:crypto'

import { CalculationModel, CreateCalculationDTO } from '@/models'

export const mockCalculation: CreateCalculationDTO = {
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

export const calculationModel: CalculationModel = {
  id: 'any-id',
  created_at: new Date('2022-08-01'),
  updated_at: new Date('2022-08-02'),
  ...mockCalculation
}