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
              name: 'entranceWeight',
              type: 'varchar',
            },
            {
              name: 'dailyCost',
              type: 'varchar',
            },
            {
              name: 'gmd',
              type: 'varchar',
            },
            {
              name: 'purchasePrice',
              type: 'varchar',
            },
            {
              name: 'lengthOfStay',
              type: 'varchar',
            },
            {
              name: 'outputWeight',
              type: 'varchar',
            },
            {
              name: 'rcInitial',
              type: 'varchar',
            },
            {
              name: 'rcEnd',
              type: 'varchar',
            },
            {
              name: 'salePrice',
              type: 'varchar',
            },
            {
              name: 'producedPrice',
              type: 'varchar',
            },
            {
              name: 'returnOnCapital',
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
