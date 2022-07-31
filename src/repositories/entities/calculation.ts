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

  @Column()
  entrance_weight!: string

  @Column()
  daily_cost!: string

  @Column()
  gmd!: string

  @Column()
  purchase_price!: string

  @Column()
  length_of_stay!: string

  @Column()
  output_weight!: string

  @Column()
  rc_initial!: string

  @Column()
  rc_end!: string

  @Column()
  sale_price!: string

  @Column()
  produced_price!: string

  @Column()
  return_on_capital!: string

  @Column()
  result!: string

  @Column()
  created_at!: Date

  @Column({ nullable: true })
  updated_at!: Date
}
