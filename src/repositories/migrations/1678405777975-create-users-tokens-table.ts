import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createUsersTokensTable1678405777975 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_tokens',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true
          },
          {
            name: 'user_id',
            type: 'varchar'
          },
          {
            name: 'refresh_token',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'expires_date',
            type: 'varchar'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_tokens')
  }
}
