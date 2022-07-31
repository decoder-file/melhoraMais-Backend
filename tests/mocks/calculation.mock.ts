import { CalculationModel } from '@/models'
import { CalculationDTO } from '@/dtos'

export const mockCalculation: CalculationDTO = {
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
  tag: 'any-tag',
  title: 'any-title',
  description: 'any-description',
  bash: 'any-bash',
  entrance_weight: 'any-entranceWeight',
  daily_cost: 'any-dailyCost',
  gmd: 'any-gmd',
  purchase_price: 'any-purchasePrice',
  length_of_stay: 'any-lengthOfStay',
  output_weight: 'any-outputWeight',
  rc_initial: 'any-rcInitial',
  rc_end: 'any-rcEnd',
  sale_price: 'any-salePrice',
  produced_price: 'any-producedPrice',
  return_on_capital: 'any-returnOnCapital',
  result: 'any-result',
  created_at: new Date('2022-08-01')
}
