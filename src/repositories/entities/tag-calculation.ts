import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('tag_calculations')
export class TagCalculationEntity {
  @PrimaryColumn()
  id!: string

  @Column()
  title!: string

  @Column()
  color!: string

  @Column({ name: 'user_id' })
  userId!: string

  @Column({ name: 'created_at' })
  createdAt!: Date

  @Column({ nullable: true, name: 'updated_at' })
  updatedAt!: Date
}
