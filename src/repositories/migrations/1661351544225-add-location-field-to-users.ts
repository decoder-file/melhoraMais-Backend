import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class addLocationFieldToUsers1661351544225 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn({
      name: 'location',
      type: 'varchar',
      isNullable: true
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'location')
  }
}
