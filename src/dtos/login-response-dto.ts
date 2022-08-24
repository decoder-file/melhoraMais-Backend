import { UserModel } from '@/models'

export type LoginResponseDTO = {
  access_token: string
  refresh_token: string
  user: Partial<UserModel>
}
