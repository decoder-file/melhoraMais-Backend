import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('calculations')
export class CalculationEntity {
  @PrimaryColumn()
  id!: string

  @Column({ nullable: true })
  tag?: string

  @Column({ nullable: true })
  title?: string

  @Column({ nullable: true })
  description?: string

  @Column()
  bash!: string

  @Column({ name: 'entrance_weight' })
  entranceWeight!: string

  @Column({ name: 'daily_cost' })
  dailyCost!: string

  @Column()
  gmd!: string

  @Column({ name: 'purchase_price' })
  purchasePrice!: string

  @Column({ name: 'length_of_stay' })
  lengthOfStay!: string

  @Column({ name: 'output_weight' })
  outputWeight!: string

  @Column({ name: 'rc_initial' })
  rcInitial!: string

  @Column({ name: 'rc_end' })
  rcEnd!: string

  @Column({ name: 'sale_price' })
  salePrice!: string

  @Column({ name: 'produced_price' })
  producedPrice!: string

  @Column({ name: 'return_on_capital' })
  returnOnCapital!: string

  @Column()
  result!: string

  @Column({ name: 'user_id' })
  userId!: string

  @Column({ name: 'created_at' })
  createdAt!: Date

  @Column({ nullable: true, name: 'updated_at' })
  updatedAt!: Date
}
