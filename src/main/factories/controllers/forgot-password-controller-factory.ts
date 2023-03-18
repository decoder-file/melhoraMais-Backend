import { ForgotPasswordController } from '@/controllers'
import { AWSSESCloudProvider } from '@/providers/aws-ses'
import { UserRepository, UsersTokensRepository } from '@/repositories'
import { ForgotPasswordService, SendMailService } from '@/services'

export const ForgotPasswordControllerFactory = () => {
  const usersRepository = new UserRepository()
  const usersTokensRepository = new UsersTokensRepository()
  const awsProvider = new AWSSESCloudProvider()
  const mailService = new SendMailService(awsProvider)
  const calculationService = new ForgotPasswordService(usersRepository, usersTokensRepository, mailService)
  const calculationController = new ForgotPasswordController(calculationService)
  return calculationController
}
