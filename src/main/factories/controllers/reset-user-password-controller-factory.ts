import { ResetUsersPasswordController } from '@/controllers'
import { UserRepository, UsersTokensRepository } from '@/repositories'
import { ResetUsersPasswordService } from '@/services'
import { DateFNSProviderFactory } from '@/main/factories/providers'

export const ResetUsersPasswordControllerFactory = (): ResetUsersPasswordController => {
  const usersRepository = new UserRepository()
  const usersTokensRepository = new UsersTokensRepository()
  const service = new ResetUsersPasswordService(usersRepository, usersTokensRepository, DateFNSProviderFactory())
  const controller = new ResetUsersPasswordController(service)
  return controller
}
