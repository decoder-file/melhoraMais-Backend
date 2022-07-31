import { TagCalculationController } from '@/controllers'
import { TagCalculationRepository } from '@/repositories'
import { TagCalculationService } from '@/services'

export const TagCalculationControllerFactory = () => {
  const tagCalculationRepository = new TagCalculationRepository()
  const tagCalculationService = new TagCalculationService(tagCalculationRepository)
  const tagCalculationController = new TagCalculationController(tagCalculationService)
  return tagCalculationController
}
