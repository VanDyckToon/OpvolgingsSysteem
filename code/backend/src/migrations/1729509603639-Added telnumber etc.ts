import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedTelnumberEtc1729509603639 implements MigrationInterface {
  name = 'AddedTelnumberEtc1729509603639';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if the column 'telefoonnummer' already exists before adding it
    await queryRunner.query(`
      DO $$
      BEGIN
          IF NOT EXISTS (
              SELECT 1 FROM information_schema.columns 
              WHERE table_name='gebruiker' AND column_name='telefoonnummer'
          ) THEN
              ALTER TABLE "gebruiker" ADD "telefoonnummer" character varying;
          END IF;
      END $$;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Optionally remove the column if it was added
    await queryRunner.query(`
      DO $$
      BEGIN
          IF EXISTS (
              SELECT 1 FROM information_schema.columns 
              WHERE table_name='gebruiker' AND column_name='telefoonnummer'
          ) THEN
              ALTER TABLE "gebruiker" DROP COLUMN "telefoonnummer";
          END IF;
      END $$;
    `);
  }
}
