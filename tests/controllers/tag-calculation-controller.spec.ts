import { TagCalculationController } from '@/controllers'
import { NotAuhorizedError, RequestError } from '@/errors'
import { TagCalculationService } from '@/services'
import { mockTagCalculation, tagCalculationModel } from '@/tests/mocks'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('TagCalculationController', () => {
  const tagCalculationService = {} as TagCalculationService
  const tagCalculationController = new TagCalculationController(tagCalculationService)
  let req: Request
  let res: Response

  beforeAll(() => {
    req = mock()
    res = mock()

    res.status = jest.fn().mockReturnThis()
    res.sendStatus = jest.fn().mockReturnThis()
    res.json = jest.fn().mockReturnThis()
  })

  beforeEach(() => {
    req.user = { id: 'any-userId' }
    req.body = { ...mockTagCalculation }
    req.params = { id: 'any-id' }
  })

  describe('create', () => {
    it('should be able to create new tag-calculation', async () => {
      tagCalculationService.create = jest.fn()

      await tagCalculationController.create(req, res)

      expect(tagCalculationService.create).toHaveBeenNthCalledWith(1, req.body, req.user.id)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to create new tag-calculation', async () => {
      const error = new Error('some-error')
      tagCalculationService.create = jest.fn().mockRejectedValue(error)

      await tagCalculationController.create(req, res)

      expect(tagCalculationService.create).toHaveBeenNthCalledWith(1, req.body, req.user.id)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error })
    })
  })

  describe('update', () => {
    it('should be able to update tag-calculation', async () => {
      tagCalculationService.update = jest.fn()

      await tagCalculationController.update(req, res)

      expect(tagCalculationService.update).toHaveBeenNthCalledWith(1, req.params.id, req.body)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to update tag-calculation', async () => {
      const error = new RequestError('some-error')
      tagCalculationService.update = jest.fn().mockRejectedValue(error)

      await tagCalculationController.update(req, res)

      expect(tagCalculationService.update).toHaveBeenNthCalledWith(1, req.params.id, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 422)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })
  })

  describe('delete', () => {
    it('should be able to delete tag-calculation', async () => {
      tagCalculationService.delete = jest.fn()

      await tagCalculationController.delete(req, res)

      expect(tagCalculationService.delete).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to delete tag-calculation', async () => {
      const error = new RequestError('some-error')
      tagCalculationService.delete = jest.fn().mockRejectedValue(error)

      await tagCalculationController.delete(req, res)

      expect(tagCalculationService.delete).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.status).toHaveBeenNthCalledWith(1, 422)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })
  })

  describe('getById', () => {
    it('should be able to get tag-calculation by id', async () => {
      tagCalculationService.getById = jest.fn().mockResolvedValue([tagCalculationModel])

      await tagCalculationController.getById(req, res)

      expect(tagCalculationService.getById).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, [tagCalculationModel])
    })

    it('should not be able to get tag-calculation by id', async () => {
      const error = new RequestError('some-error')
      tagCalculationService.getById = jest.fn().mockRejectedValue(error)

      await tagCalculationController.getById(req, res)

      expect(tagCalculationService.getById).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.status).toHaveBeenNthCalledWith(1, 422)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })
  })

  describe('getByUser', () => {
    it('should be able to get list of tag-calculation', async () => {
      tagCalculationService.getByUser = jest.fn().mockResolvedValue([tagCalculationModel])

      await tagCalculationController.getByUser(req, res)

      expect(tagCalculationService.getByUser).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, [tagCalculationModel])
    })

    it('should not be able to get list of tag-calculation', async () => {
      const error = new NotAuhorizedError('some-error')
      tagCalculationService.getByUser = jest.fn().mockRejectedValue(error)

      await tagCalculationController.getByUser(req, res)

      expect(tagCalculationService.getByUser).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 401)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })
  })
})
