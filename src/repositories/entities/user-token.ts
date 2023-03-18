import { UserEntity } from './user'

import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity('users_tokens')
export class UserTokenEntity {
  @PrimaryColumn()
  id!: string

  @Column({ name: 'user_id' })
  userId!: string

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity

  @Column({ name: 'refresh_token' })
  refreshToken!: string

  @Column({ name: 'expires_date' })
  expiresDate!: Date

  @Column({ name: 'created_at' })
  createdAt!: Date
}
