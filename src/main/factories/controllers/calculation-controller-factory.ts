import { CalculationController } from '@/controllers'
import { CalculationRepository } from '@/repositories'
import { CalculationService } from '@/services'

export const CalculationControllerFactory = () => {
  const calculationRepository = new CalculationRepository()
  const calculationService = new CalculationService(calculationRepository)
  const calculationController = new CalculationController(calculationService)
  return calculationController
}
