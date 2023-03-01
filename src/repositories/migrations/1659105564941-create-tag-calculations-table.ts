import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createTagCalculationsTable1659105564941 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: 'tag_calculations',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              isPrimary: true
            },
            {
              name: 'title',
              type: 'varchar'
            },
            {
              name: 'color',
              type: 'varchar'
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

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tag_calculations')
  }
}
