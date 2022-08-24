import { randomUUID } from 'node:crypto'

import { UserModel } from '@/models'
import { UserDTO } from '@/dtos'

export const mockUUID = randomUUID()

export const mockUser: UserDTO = {
  name: 'any-name',
  email: 'any-email',
  password: 'any-hashed-password',
  location: 'any-location'
}

export const userModel: UserModel = {
  id: 'any-id',
  created_at: new Date('2022-08-01'),
  updated_at: new Date('2022-08-01'),
  ...mockUser
}
