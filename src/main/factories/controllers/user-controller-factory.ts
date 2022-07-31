import { UserController } from '@/controllers'
import { UserRepository } from '@/repositories'
import { UserService } from '@/services'

export const UserControllerFactory = () => {
  const userRepository = new UserRepository()
  const userService = new UserService(userRepository)
  const userController = new UserController(userService)
  return userController
}
