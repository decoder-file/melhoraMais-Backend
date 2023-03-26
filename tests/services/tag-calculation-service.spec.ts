import { RequestError } from '@/errors'
import { TagCalculationRepository } from '@/repositories'
import { TagCalculationService } from '@/services'

import { mockTagCalculation, mockTagCalculationSync, tagCalculationModel } from '@/tests/mocks'

describe('TagCalculationService', () => {
  const userId = 'any-userId'
  const tagCalculationRepository = {} as TagCalculationRepository
  const tagCalculationService = new TagCalculationService(tagCalculationRepository)

  jest
    .useFakeTimers()
    .setSystemTime(new Date('2022-08-01'))

  describe('create', () => {
    it('should be able to create calculation', async () => {
      tagCalculationRepository.create = jest.fn()

      await tagCalculationService.create(mockTagCalculation, userId)

      expect(tagCalculationRepository.create).toHaveBeenNthCalledWith(1, mockTagCalculation, userId)
    })
  })

  describe('update', () => {
    it('should be able to update an existing calculation', async () => {
      tagCalculationRepository.findById = jest.fn().mockResolvedValue(tagCalculationModel)
      tagCalculationRepository.update = jest.fn()

      await tagCalculationService.update('any-id', mockTagCalculation)

      expect(tagCalculationRepository.findById).toHaveBeenNthCalledWith(1, tagCalculationModel.id)
      expect(tagCalculationRepository.update).toHaveBeenNthCalledWith(1, {
        ...tagCalculationModel,
        updatedAt: new Date()
      })
    })

    it('should not be able to update an non-existing tag-calculation', async () => {
      tagCalculationRepository.findById = jest.fn()
      tagCalculationRepository.update = jest.fn()
      const error = new RequestError('TagCalculation não existe.')
      const nonExistingId = 'non-existing-id'

      const promise = tagCalculationService.update(nonExistingId, mockTagCalculation)

      await expect(promise).rejects.toThrow(error)
      expect(tagCalculationRepository.findById).toHaveBeenNthCalledWith(1, nonExistingId)
      expect(tagCalculationRepository.update).not.toHaveBeenCalled()
    })
  })

  describe('get', () => {
    it('should be able to get all tag-calculations by userId', async () => {
      tagCalculationRepository.getByUser = jest.fn().mockResolvedValue([tagCalculationModel])

      await tagCalculationService.getByUser(userId)

      expect(tagCalculationRepository.getByUser).toHaveBeenNthCalledWith(1, userId)
    })
  })

  describe('getById', () => {
    it('should be able to get user by id', async () => {
      tagCalculationRepository.findById = jest.fn().mockResolvedValue(tagCalculationModel)

      await tagCalculationService.getById('any-id')

      expect(tagCalculationRepository.findById).toHaveBeenNthCalledWith(1, tagCalculationModel.id)
    })

    it('should not be able to get user by id', async () => {
      tagCalculationRepository.findById = jest.fn().mockResolvedValue({})

      await tagCalculationService.getById('any-id')

      expect(tagCalculationRepository.findById).toHaveBeenNthCalledWith(1, tagCalculationModel.id)
    })
  })

  describe('sync', () => {
    it('should be able to upsert tag-calculations', async () => {
      tagCalculationRepository.delete = jest.fn()
      tagCalculationRepository.upsert = jest.fn()
      tagCalculationRepository.getByUser = jest.fn().mockResolvedValue([tagCalculationModel, tagCalculationModel])

      await tagCalculationService.sync(userId, [mockTagCalculationSync])

      expect(tagCalculationRepository.getByUser).toHaveBeenNthCalledWith(1, tagCalculationModel.userId)
      expect(tagCalculationRepository.upsert).toHaveBeenNthCalledWith(1, [mockTagCalculationSync])
    })

    it('should be able to delete tag-calculations on upsert', async () => {
      tagCalculationRepository.delete = jest.fn()
      tagCalculationRepository.upsert = jest.fn()
      tagCalculationRepository.getByUser = jest.fn().mockResolvedValue([tagCalculationModel, tagCalculationModel])

      await tagCalculationService.sync(userId, [{ ...mockTagCalculationSync, id: 'id-to-delete' }])

      expect(tagCalculationRepository.getByUser).toHaveBeenNthCalledWith(1, tagCalculationModel.userId)
      expect(tagCalculationRepository.upsert).toHaveBeenNthCalledWith(1, [{ ...mockTagCalculationSync, id: 'id-to-delete' }])
    })
  })

  describe('delete', () => {
    it('should be able to delete calculation', async () => {
      tagCalculationRepository.findById = jest.fn().mockResolvedValue(tagCalculationModel)
      tagCalculationRepository.delete = jest.fn()

      await tagCalculationService.delete('any-id')

      expect(tagCalculationRepository.findById).toHaveBeenNthCalledWith(1, tagCalculationModel.id)
      expect(tagCalculationRepository.delete).toHaveBeenNthCalledWith(1, tagCalculationModel.id)
    })

    it('should not be able to delete non-existing user', async () => {
      tagCalculationRepository.findById = jest.fn()
      tagCalculationRepository.delete = jest.fn()
      const error = new Error('TagCalculation não existe.')
      const nonExistingId = 'non-existing-id'

      const promise = tagCalculationService.delete(nonExistingId)

      await expect(promise).rejects.toThrow(error)
      expect(tagCalculationRepository.findById).toHaveBeenNthCalledWith(1, nonExistingId)
      expect(tagCalculationRepository.delete).not.toHaveBeenCalled()
    })
  })
})
