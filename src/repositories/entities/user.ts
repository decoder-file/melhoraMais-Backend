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

  @Column({ name: 'created_at', default: () => 'now()' })
  createdAt!: Date

  @Column({ name: 'updated_at', nullable: true })
  updatedAt!: Date
}