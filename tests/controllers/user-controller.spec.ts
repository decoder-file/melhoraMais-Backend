import { UserController } from '@/controllers'
import { NotAuhorizedError, RequestError } from '@/errors'
import { UserService } from '@/services'
import { mockUser, userModel } from '@/tests/mocks'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('UserController', () => {
  const userService = {} as UserService
  const userController = new UserController(userService)
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
    req.body = { ...mockUser }
    req.params = { id: 'any-id' }
  })

  describe('create', () => {
    it('should be able to create new calculation', async () => {
      userService.create = jest.fn()

      await userController.create(req, res)

      expect(userService.create).toHaveBeenNthCalledWith(1, req.body)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to create new calculation', async () => {
      const error = new Error('some-error')
      userService.create = jest.fn().mockRejectedValue(error)

      await userController.create(req, res)

      expect(userService.create).toHaveBeenNthCalledWith(1, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error })
    })
  })

  describe('update', () => {
    it('should be able to update calculation', async () => {
      userService.update = jest.fn()

      await userController.update(req, res)

      expect(userService.update).toHaveBeenNthCalledWith(1, req.params.id, req.body)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to update calculation', async () => {
      const error = new RequestError('some-error')
      userService.update = jest.fn().mockRejectedValue(error)

      await userController.update(req, res)

      expect(userService.update).toHaveBeenNthCalledWith(1, req.params.id, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 422)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })
  })

  describe('delete', () => {
    it('should be able to delete calculation', async () => {
      userService.delete = jest.fn()

      await userController.delete(req, res)

      expect(userService.delete).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.sendStatus).toHaveBeenNthCalledWith(1, 200)
    })

    it('should not be able to delete calculation', async () => {
      const error = new RequestError('some-error')
      userService.delete = jest.fn().mockRejectedValue(error)

      await userController.delete(req, res)

      expect(userService.delete).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.status).toHaveBeenNthCalledWith(1, 422)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })
  })

  describe('getById', () => {
    it('should be able to get calculation by id', async () => {
      userService.getById = jest.fn().mockResolvedValue([userModel])

      await userController.getById(req, res)

      expect(userService.getById).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, [userModel])
    })

    it('should not be able to get calculation by id', async () => {
      const error = new RequestError('some-error')
      userService.getById = jest.fn().mockRejectedValue(error)

      await userController.getById(req, res)

      expect(userService.getById).toHaveBeenNthCalledWith(1, req.params.id)
      expect(res.status).toHaveBeenNthCalledWith(1, 422)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })
  })

  describe('get', () => {
    it('should be able to get list of calculation', async () => {
      userService.get = jest.fn().mockResolvedValue([userModel])

      await userController.get(req, res)

      expect(userService.get).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, [userModel])
    })

    it('should not be able to get list of calculation', async () => {
      const error = new NotAuhorizedError('some-error')
      userService.get = jest.fn().mockRejectedValue(error)

      await userController.get(req, res)

      expect(userService.get).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 401)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })
  })
})
