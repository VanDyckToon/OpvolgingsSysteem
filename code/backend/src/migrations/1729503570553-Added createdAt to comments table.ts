import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedCreatedAtToCommentsTable1729503570553
  implements MigrationInterface
{
  name = 'AddedCreatedAtToCommentsTable1729503570553';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "gebruiker" DROP CONSTRAINT "UQ_ecc969fa3f9bb267946d53a7c2f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gebruiker" DROP COLUMN "telefoonnummer"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gebruiker" DROP COLUMN "extraOpmerking"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "gebruiker" ADD "extraOpmerking" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "gebruiker" ADD "telefoonnummer" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "gebruiker" ADD CONSTRAINT "UQ_ecc969fa3f9bb267946d53a7c2f" UNIQUE ("telefoonnummer")`,
    );
  }
}
