import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  id!: string

  @Column()
  name!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @Column()
  created_at!: Date

  @Column({ nullable: true })
  updated_at!: Date
}
