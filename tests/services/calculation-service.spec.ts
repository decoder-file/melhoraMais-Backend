import { CalculationRepository } from '@/repositories'
import { CalculationService } from '@/services'

import { calculationModel, mockCalculation } from '@/tests/mocks'

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => 'any-id')
}))

describe('CalculationService', () => {
  const calculationRepository = {} as CalculationRepository
  const calculationService = new CalculationService(calculationRepository)

  jest
    .useFakeTimers()
    .setSystemTime(new Date('2022-08-01'))

  describe('create', () => {
    it('should be able to create calculation', async () => {
      calculationRepository.create = jest.fn()

      await calculationService.create(mockCalculation)

      expect(calculationRepository.create).toHaveBeenNthCalledWith(1, mockCalculation)
    })
  })

  describe('update', () => {
    it('should be able to update an existing calculation', async () => {
      calculationRepository.findById = jest.fn().mockResolvedValue(calculationModel)
      calculationRepository.update = jest.fn()

      await calculationService.update(calculationModel.id!, mockCalculation)

      expect(calculationRepository.findById).toHaveBeenNthCalledWith(1, calculationModel.id)
      expect(calculationRepository.update).toHaveBeenNthCalledWith(1, calculationModel.id, mockCalculation)
    })

    it('should not be able to update an non-existing calculation', async () => {
      calculationRepository.findById = jest.fn()
      calculationRepository.update = jest.fn()
      const error = new Error('Calculation não existe.')
      const nonExistingId = 'non-existing-id'

      const promise = calculationService.update(nonExistingId, mockCalculation)

      await expect(promise).rejects.toThrow(error)
      expect(calculationRepository.findById).toHaveBeenNthCalledWith(1, nonExistingId)
      expect(calculationRepository.update).not.toHaveBeenCalled()
    })
  })

  describe('get', () => {
    it('should be able to get all users', async () => {
      calculationRepository.get = jest.fn().mockResolvedValue([calculationModel])

      await calculationService.get()

      expect(calculationRepository.get).toHaveBeenCalled()
    })

    it('should be able to get empty list of users', async () => {
      calculationRepository.get = jest.fn().mockResolvedValue([])

      await calculationService.get()

      expect(calculationRepository.get).toHaveBeenCalled()
    })
  })

  describe('getById', () => {
    it('should be able to get user by id', async () => {
      calculationRepository.findById = jest.fn().mockResolvedValue(calculationModel)

      await calculationService.getById('any-id')

      expect(calculationRepository.findById).toHaveBeenNthCalledWith(1, calculationModel.id)
    })

    it('should not be able to get user by id', async () => {
      calculationRepository.findById = jest.fn().mockResolvedValue({})

      await calculationService.getById('any-id')

      expect(calculationRepository.findById).toHaveBeenNthCalledWith(1, calculationModel.id)
    })
  })

  describe('delete', () => {
    it('should be able to delete calculation', async () => {
      calculationRepository.findById = jest.fn().mockResolvedValue(calculationModel)
      calculationRepository.delete = jest.fn()

      await calculationService.delete('any-id')

      expect(calculationRepository.findById).toHaveBeenNthCalledWith(1, calculationModel.id)
      expect(calculationRepository.delete).toHaveBeenNthCalledWith(1, calculationModel.id)
    })

    it('should not be able to delete non-existing user', async () => {
      calculationRepository.findById = jest.fn()
      calculationRepository.delete = jest.fn()
      const error = new Error('Calculation não existe.')
      const nonExistingId = 'non-existing-id'

      const promise = calculationService.delete(nonExistingId)

      await expect(promise).rejects.toThrow(error)
      expect(calculationRepository.findById).toHaveBeenNthCalledWith(1, nonExistingId)
      expect(calculationRepository.delete).not.toHaveBeenCalled()
    })
  })
})
