import { randomUUID } from 'crypto'

import { TagCalculationDTO } from '@/dtos'

export class TagCalculationModel {
  id?: string
  title: string
  color: string
  created_at: Date

  constructor (tagCalculation: TagCalculationDTO) {
    if (!this.id) {
      this.id = randomUUID()
    }
    this.title = tagCalculation.title
    this.color = tagCalculation.color
    this.created_at = new Date()
  }
}
