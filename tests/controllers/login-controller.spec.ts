import { LoginController } from '@/controllers'
import { RequestError } from '@/errors'
import { LoginService } from '@/services'

import { Request, Response } from 'express'
import { mock } from 'jest-mock-extended'

describe('LoginController', () => {
  const loginResponse = { access_token: 'any-generated-token', refresh_token: 'any-generated-refresh-token' }
  const loginService = {} as LoginService
  const loginController = new LoginController(loginService)
  let req: Request
  let res: Response

  beforeAll(() => {
    req = mock()
    res = mock()

    res.status = jest.fn().mockReturnThis()
    res.json = jest.fn().mockReturnThis()
  })

  beforeEach(() => {
    req.body = { email: 'any-email@mail.com', password: 'any-password' }
  })

  describe('login', () => {
    it('should be able to generate both access_token and refresh_token', async () => {
      loginService.login = jest.fn().mockResolvedValue(loginResponse)

      await loginController.handle(req, res)

      expect(loginService.login).toHaveBeenNthCalledWith(1, req.body)
      expect(res.json).toHaveBeenNthCalledWith(1, loginResponse)
    })

    it('should not be able to generate both access_token and refresh_token', async () => {
      const error = new RequestError('Usuário/senha inválido.')
      loginService.login = jest.fn().mockRejectedValue(error)

      await loginController.handle(req, res)

      expect(loginService.login).toHaveBeenNthCalledWith(1, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 401)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error.message })
    })

    it('should not be able to generate both access_token and refresh_token', async () => {
      const error = new Error('some-error')
      loginService.login = jest.fn().mockRejectedValue(error)

      await loginController.handle(req, res)

      expect(loginService.login).toHaveBeenNthCalledWith(1, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, { message: error })
    })
  })
})
