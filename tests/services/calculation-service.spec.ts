import { CalculationRepository } from '@/repositories'
import { CalculationService } from '@/services'

import { calculationModel, mockCalculation, mockCalculationSync } from '@/tests/mocks'

jest.mock('crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => 'any-id')
}))

describe('CalculationService', () => {
  const userId = 'any-userId'
  const calculationRepository = {} as CalculationRepository
  const calculationService = new CalculationService(calculationRepository)

  jest
    .useFakeTimers()
    .setSystemTime(new Date('2022-08-01'))

  describe('create', () => {
    it('should be able to create calculation', async () => {
      calculationRepository.create = jest.fn()

      await calculationService.create(mockCalculation, userId)

      expect(calculationRepository.create).toHaveBeenNthCalledWith(1, mockCalculation, userId)
    })
  })

  describe('update', () => {
    it('should be able to update an existing calculation', async () => {
      calculationRepository.findById = jest.fn().mockResolvedValue(calculationModel)
      calculationRepository.update = jest.fn()

      await calculationService.update(calculationModel.id!, mockCalculation)

      expect(calculationRepository.findById).toHaveBeenNthCalledWith(1, calculationModel.id)
      expect(calculationRepository.update).toHaveBeenNthCalledWith(1, {
        ...calculationModel,
        updatedAt: new Date()
      })
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

  describe('getByUser', () => {
    it('should be able to get all calculations by user', async () => {
      calculationRepository.getByUser = jest.fn().mockResolvedValue([calculationModel])

      await calculationService.getByUser(userId)

      expect(calculationRepository.getByUser).toHaveBeenNthCalledWith(1, userId)
    })

    it('should be able to get empty list of calculations by users', async () => {
      calculationRepository.getByUser = jest.fn().mockResolvedValue([])

      await calculationService.getByUser(userId)

      expect(calculationRepository.getByUser).toHaveBeenCalled()
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

  describe('sync', () => {
    it('should be able to upsert calculations', async () => {
      calculationRepository.delete = jest.fn()
      calculationRepository.upsert = jest.fn()
      calculationRepository.getByUser = jest.fn().mockResolvedValue([calculationModel, calculationModel])

      await calculationService.sync(userId, [mockCalculationSync])

      expect(calculationRepository.getByUser).toHaveBeenNthCalledWith(1, calculationModel.userId)
      expect(calculationRepository.upsert).toHaveBeenNthCalledWith(1, [mockCalculationSync])
    })

    it('should be able to delete calculations on upsert', async () => {
      calculationRepository.delete = jest.fn()
      calculationRepository.upsert = jest.fn()
      calculationRepository.getByUser = jest.fn().mockResolvedValue([calculationModel, calculationModel])

      await calculationService.sync(userId, [{ ...mockCalculationSync, id: 'id-to-delete' }])

      expect(calculationRepository.getByUser).toHaveBeenNthCalledWith(1, calculationModel.userId)
      expect(calculationRepository.upsert).toHaveBeenNthCalledWith(1, [{ ...mockCalculationSync, id: 'id-to-delete' }])
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
