import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRolTable1728483682429 implements MigrationInterface {
  name = 'CreateRolTable1728483682429';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rol" ("rolID" SERIAL NOT NULL, "naam" character varying NOT NULL, CONSTRAINT "PK_cf995a472f57db974ff9f06947d" PRIMARY KEY ("rolID"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "rol"`);
  }
}
