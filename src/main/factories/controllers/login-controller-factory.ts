import { LoginController } from '@/controllers'
import { UserRepository } from '@/repositories'
import { LoginService } from '@/services'

export const LoginControllerFactory = () => {
  const userRepository = new UserRepository()
  const loginService = new LoginService(userRepository)
  const loginController = new LoginController(loginService)
  return loginController
}
