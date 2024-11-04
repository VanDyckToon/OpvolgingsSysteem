import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedColorCodeToDB1730721348025 implements MigrationInterface {
  name = 'AddedColorCodeToDB1730721348025';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Add the kleurcode column as nullable
    await queryRunner.query(
      `ALTER TABLE "score" ADD "kleurcode" character varying`,
    );

    // Step 2: Optionally set a default value for existing records
    // For example, setting all existing kleurcode to 'defaultColor'
    await queryRunner.query(
      `UPDATE "score" SET "kleurcode" = 'defaultColor' WHERE "kleurcode" IS NULL`,
    );

    // Step 3: Alter the column to make it NOT NULL
    await queryRunner.query(
      `ALTER TABLE "score" ALTER COLUMN "kleurcode" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Rollback: drop the kleurcode column
    await queryRunner.query(`ALTER TABLE "score" DROP COLUMN "kleurcode"`);
  }
}
