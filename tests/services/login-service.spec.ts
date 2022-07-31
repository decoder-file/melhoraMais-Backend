import { RequestError } from '@/errors'
import { UserRepository } from '@/repositories'
import { LoginService } from '@/services'

import { userModel } from '@/tests/mocks'

jest.mock('bcryptjs', () => ({
  compare: jest.fn().mockResolvedValueOnce(true)
}))

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn()
    .mockReturnValueOnce('any-generated-token')
    .mockReturnValueOnce('any-generated-refresh-token')
}))

describe('LoginService', () => {
  const userRepository = {} as UserRepository
  const loginService = new LoginService(userRepository)

  describe('login', () => {
    it('should be able to generate both access_token and refresh_token', async () => {
      userRepository.findByEmail = jest.fn().mockResolvedValue(userModel)

      const response = await loginService.login(userModel)

      expect(userRepository.findByEmail).toHaveBeenNthCalledWith(1, userModel.email)
      expect(response.access_token).toEqual('any-generated-token')
      expect(response.refresh_token).toEqual('any-generated-refresh-token')
    })

    it('should not be able to generate both access_token and refresh_token if user not found', async () => {
      const error = new RequestError('Usuário/senha inválido.')
      userRepository.findByEmail = jest.fn()

      const promise = loginService.login(userModel)

      await expect(promise).rejects.toThrow(error)
      expect(userRepository.findByEmail).toHaveBeenNthCalledWith(1, userModel.email)
      expect(promise).not.toHaveProperty('access_token')
      expect(promise).not.toHaveProperty('refresh_token')
    })

    it('should not be able to generate both access_token and refresh_token if password not match', async () => {
      const error = new RequestError('Usuário/senha inválido.')
      userRepository.findByEmail = jest.fn().mockResolvedValue(userModel)

      const promise = loginService.login({ email: userModel.email, password: 'invalid-password' })

      await expect(promise).rejects.toThrow(error)
      expect(userRepository.findByEmail).toHaveBeenNthCalledWith(1, userModel.email)
      expect(promise).not.toHaveProperty('access_token')
      expect(promise).not.toHaveProperty('refresh_token')
    })
  })
})
