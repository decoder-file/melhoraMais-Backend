import { CalculationController } from '@/controllers'
import { NotAuhorizedError, RequestError } from '@/errors'
import { CalculationService } from '@/services'
import { mockCalculation, tagCalculationModel } from '@/tests/mocks'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('calculationController', () => {
  const calculationService = {} as CalculationService
  const calculationController = new CalculationController(calculationService)
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
    req.body = { ...mockCalculation }
    req.params = { id: 'any-id' }
  })

  describe('create', () => {
    it('should be able to create new calculation', async () => {
      calculationService.create = jest.fn()

      await calculationController.create(req, res)

      expect(calculationService.create).toHaveBeenNthCalledWith(1, req.body, req.user.id)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to create new calculation', async () => {
      const error = new Error('some-error')
      calculationService.create = jest.fn().mockRejectedValue(error)

      await calculationController.create(req, res)

      expect(calculationService.create).toHaveBeenNthCalledWith(1, req.body, req.user.id)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error })
    })
  })

  describe('update', () => {
    it('should be able to update calculation', async () => {
      calculationService.update = jest.fn()

      await calculationController.update(req, res)

      expect(calculationService.update).toHaveBeenNthCalledWith(1, req.params.id, req.body)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to update calculation', async () => {
      const error = new RequestError('some-error')
      calculationService.update = jest.fn().mockRejectedValue(error)

      await calculationController.update(req, res)

      expect(calculationService.update).toHaveBeenNthCalledWith(1, req.params.id, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 422)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })
  })

  describe('delete', () => {
    it('should be able to delete calculation', async () => {
      calculationService.delete = jest.fn()

      await calculationController.delete(req, res)

      expect(calculationService.delete).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to delete calculation', async () => {
      const error = new RequestError('some-error')
      calculationService.delete = jest.fn().mockRejectedValue(error)

      await calculationController.delete(req, res)

      expect(calculationService.delete).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.status).toHaveBeenNthCalledWith(1, 422)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })
  })

  describe('getById', () => {
    it('should be able to get calculation by id', async () => {
      calculationService.getById = jest.fn().mockResolvedValue([tagCalculationModel])

      await calculationController.getById(req, res)

      expect(calculationService.getById).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, [tagCalculationModel])
    })

    it('should not be able to get calculation by id', async () => {
      const error = new RequestError('some-error')
      calculationService.getById = jest.fn().mockRejectedValue(error)

      await calculationController.getById(req, res)

      expect(calculationService.getById).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.status).toHaveBeenNthCalledWith(1, 422)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })
  })

  describe('getByUser', () => {
    it('should be able to get list of calculation', async () => {
      calculationService.getByUser = jest.fn().mockResolvedValue([tagCalculationModel])

      await calculationController.getByUser(req, res)

      expect(calculationService.getByUser).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, [tagCalculationModel])
    })

    it('should not be able to get list of calculation', async () => {
      const error = new NotAuhorizedError('some-error')
      calculationService.getByUser = jest.fn().mockRejectedValue(error)

      await calculationController.getByUser(req, res)

      expect(calculationService.getByUser).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 401)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })
  })
})
