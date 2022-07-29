import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createCalculationsTable1659058357231 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: 'calculations',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'uuid'
            },
            {
              name: 'tag',
              type: 'varchar',
              isNullable: true,
              default: null
            },
            {
              name: 'title',
              type: 'varchar',
              isNullable: true,
              default: null
            },
            {
              name: 'description',
              type: 'varchar',
              isNullable: true,
              default: null
            },
            {
              name: 'bash',
              type: 'varchar',
            },
            {
              name: 'entrance_weight',
              type: 'varchar',
            },
            {
              name: 'daily_cost',
              type: 'varchar',
            },
            {
              name: 'gmd',
              type: 'varchar',
            },
            {
              name: 'purchase_price',
              type: 'varchar',
            },
            {
              name: 'length_of_stay',
              type: 'varchar',
            },
            {
              name: 'output_weight',
              type: 'varchar',
            },
            {
              name: 'rc_initial',
              type: 'varchar',
            },
            {
              name: 'rc_end',
              type: 'varchar',
            },
            {
              name: 'sale_price',
              type: 'varchar',
            },
            {
              name: 'produced_price',
              type: 'varchar',
            },
            {
              name: 'return_on_capital',
              type: 'varchar',
            },
            {
              name: 'result',
              type: 'varchar',
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()'
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              isNullable: true,
              default: null
            }
          ]
        }
      )
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('calculations')
  }
}
