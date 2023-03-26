import { randomUUID } from 'crypto'

import { TagCalculationDTO } from '@/dtos'

export class TagCalculationModel {
  id?: string
  title: string
  color: string
  userId: string
  createdAt: Date

  constructor (tagCalculation: TagCalculationDTO, userId: string) {
    if (!this.id) {
      this.id = tagCalculation.id ?? randomUUID()
    }
    this.title = tagCalculation.title
    this.color = tagCalculation.color
    this.userId = userId
    this.createdAt = new Date()
  }
}
