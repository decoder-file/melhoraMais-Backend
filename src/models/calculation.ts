import { randomUUID } from 'node:crypto'

import { CalculationDTO } from '@/dtos'
export class CalculationModel {
  id?: string
  tag?: string
  title?: string
  description?: string
  bash: string
  entrance_weight: string
  daily_cost: string
  gmd: string
  purchase_price: string
  length_of_stay: string
  output_weight: string
  rc_initial: string
  rc_end: string
  sale_price: string
  produced_price: string
  return_on_capital: string
  result: string
  created_at: Date

  constructor (calculation: CalculationDTO) {
    if (!this.id) {
      this.id = randomUUID()
    }
    this.tag = calculation.tag
    this.title = calculation.title
    this.description = calculation.description
    this.bash = calculation.bash
    this.entrance_weight = calculation.entranceWeight
    this.daily_cost = calculation.dailyCost
    this.gmd = calculation.gmd
    this.purchase_price = calculation.purchasePrice
    this.length_of_stay = calculation.lengthOfStay
    this.output_weight = calculation.outputWeight
    this.rc_initial = calculation.rcInitial
    this.rc_end = calculation.rcEnd
    this.sale_price = calculation.salePrice
    this.produced_price = calculation.producedPrice
    this.return_on_capital = calculation.returnOnCapital
    this.result = calculation.result
    this.created_at = new Date()
  }
}
