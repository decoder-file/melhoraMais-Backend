import { randomUUID } from 'node:crypto'

import { CreateUserDTO, UserModel } from '@/models'

export const mockUUID = randomUUID()

export const mockUser: CreateUserDTO = {
  name: 'any-name',
  email: 'any-email',
  password: 'any-password',
}

export const userModel: UserModel = {
  id: '3948c9ac-061c-4f40-b07a-3fc78a50bfe2',
  created_at: new Date('2022-08-01'),
  updated_at: null,
  ...mockUser
}
