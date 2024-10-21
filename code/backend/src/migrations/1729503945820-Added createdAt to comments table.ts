import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedCreatedAtToCommentsTable1729503945820
  implements MigrationInterface
{
  name = 'AddedCreatedAtToCommentsTable1729503945820';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "opmerking" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "opmerking" DROP COLUMN "createdAt"`);
  }
}
