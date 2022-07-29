import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('tag_calculations')
export class TagCalculationEntity {
  @PrimaryColumn()
  id!: string

  @Column()
  title!: string

  @Column()
  color!: string

  @Column()
  created_at!: Date

  @Column({ nullable: true })
  updated_at!: Date
}