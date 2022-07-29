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
  entranceWeight!: string

  @Column()
  dailyCost!: string

  @Column()
  gmd!: string

  @Column()
  purchasePrice!: string

  @Column()
  lengthOfStay!: string

  @Column()
  outputWeight!: string

  @Column()
  rcInitial!: string

  @Column()
  rcEnd!: string

  @Column()
  salePrice!: string

  @Column()
  producedPrice!: string

  @Column()
  returnOnCapital!: string

  @Column()
  result!: string

  @Column({ name: 'created_at', default: () => 'now()' })
  createdAt!: Date

  @Column({ name: 'updated_at', nullable: true })
  updatedAt!: Date
}