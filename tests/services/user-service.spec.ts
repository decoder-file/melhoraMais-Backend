import { UserRepository } from '@/repositories'
import { UserService } from '@/services'

import { mockUser, userModel } from '@/tests/mocks'

jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockImplementation(() => 'any-hashed-password')
}))

describe('UserService', () => {
  const userRepository = {} as UserRepository
  const userService = new UserService(userRepository)
  const hashedPassword = 'any-hashed-password'

  describe('create', () => {
    jest.mock('bcryptjs', () => ({
      hash: jest.fn().mockResolvedValue(hashedPassword)
    }))

    it('should be able to create user', async () => {
      userRepository.findByEmail = jest.fn()
      userRepository.create = jest.fn()

      await userService.create(mockUser)

      expect(userRepository.findByEmail).toHaveBeenNthCalledWith(1, mockUser.email)
      expect(userRepository.create).toHaveBeenNthCalledWith(1, {
        ...mockUser,
        password: hashedPassword
      })
    })

    it('should not be able to create user with existing email', async () => {
      userRepository.findByEmail = jest.fn().mockResolvedValue(userModel)
      userRepository.create = jest.fn()
      const error = new Error('Usuário já existe.')

      const promise = userService.create(mockUser)

      await expect(promise).rejects.toThrow(error)
      expect(userRepository.findByEmail).toHaveBeenNthCalledWith(1, mockUser.email)
      expect(userRepository.create).not.toHaveBeenCalled()
    })
  })

  describe('update', () => {
    it('should be able to update user', async () => {
      userRepository.findById = jest.fn().mockResolvedValue(userModel)
      userRepository.update = jest.fn()

      await userService.update('any-id', mockUser)

      expect(userRepository.findById).toHaveBeenNthCalledWith(1, userModel.id)
      expect(userRepository.update).toHaveBeenNthCalledWith(1, userModel, mockUser)
    })

    it('should not be able to update an non-existing user', async () => {
      userRepository.findById = jest.fn()
      userRepository.update = jest.fn()
      const error = new Error('Usuário não existe.')
      const nonExistingId = 'non-existing-id'

      const promise = userService.update(nonExistingId, mockUser)

      await expect(promise).rejects.toThrow(error)
      expect(userRepository.findById).toHaveBeenNthCalledWith(1, nonExistingId)
      expect(userRepository.update).not.toHaveBeenCalled()
    })
  })

  describe('delete', () => {
    it('should be able to delete user', async () => {
      userRepository.findById = jest.fn().mockResolvedValue(userModel)
      userRepository.delete = jest.fn()

      await userService.delete('any-id')

      expect(userRepository.findById).toHaveBeenNthCalledWith(1, 'any-id')
      expect(userRepository.delete).toHaveBeenNthCalledWith(1, 'any-id')
    })

    it('should not be able to delete non-existing user', async () => {
      userRepository.findById = jest.fn()
      userRepository.delete = jest.fn()
      const error = new Error('Usuário não existe.')
      const nonExistingId = 'non-existing-id'

      const promise = userService.delete(nonExistingId)

      await expect(promise).rejects.toThrow(error)
      expect(userRepository.findById).toHaveBeenNthCalledWith(1, nonExistingId)
      expect(userRepository.delete).not.toHaveBeenCalled()
    })
  })

  describe('get', () => {
    it('should be able to get all users', async () => {
      userRepository.get = jest.fn().mockResolvedValue([userModel])

      await userService.get()

      expect(userRepository.get).toHaveBeenCalled()
    })

    it('should be able to get empty list of users', async () => {
      userRepository.get = jest.fn().mockResolvedValue([])

      await userService.get()

      expect(userRepository.get).toHaveBeenCalled()
    })
  })

  describe('getById', () => {
    it('should be able to get user by id', async () => {
      userRepository.findById = jest.fn().mockResolvedValue(userModel)

      await userService.getById('any-id')

      expect(userRepository.findById).toHaveBeenNthCalledWith(1, 'any-id')
    })

    it('should not be able to get user by id', async () => {
      userRepository.findById = jest.fn().mockResolvedValue({})

      await userService.getById('any-id')

      expect(userRepository.findById).toHaveBeenNthCalledWith(1, 'any-id')
    })
  })
})
