import { randomUUID } from 'crypto'

import { CalculationDTO } from '@/dtos'
export class CalculationModel {
  id?: string
  tag?: string
  title?: string
  description?: string
  bash: string
  entranceWeight: string
  dailyCost: string
  gmd: string
  purchasePrice: string
  lengthOfStay: string
  outputWeight: string
  rcInitial: string
  rcEnd: string
  salePrice: string
  producedPrice: string
  returnOnCapital: string
  result: string
  userId: string
  createdAt: Date
  updatedAt?: Date

  constructor (calculation: CalculationDTO, userId: string) {
    if (!this.id) {
      this.id = calculation.id ?? randomUUID()
    }
    this.tag = calculation.tag
    this.title = calculation.title
    this.description = calculation.description
    this.bash = calculation.bash
    this.entranceWeight = calculation.entranceWeight
    this.dailyCost = calculation.dailyCost
    this.gmd = calculation.gmd
    this.purchasePrice = calculation.purchasePrice
    this.lengthOfStay = calculation.lengthOfStay
    this.outputWeight = calculation.outputWeight
    this.rcInitial = calculation.rcInitial
    this.rcEnd = calculation.rcEnd
    this.salePrice = calculation.salePrice
    this.producedPrice = calculation.producedPrice
    this.returnOnCapital = calculation.returnOnCapital
    this.result = calculation.result
    this.userId = userId
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}
