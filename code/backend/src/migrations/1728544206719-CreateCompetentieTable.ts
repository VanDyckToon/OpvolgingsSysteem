import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCompetentieTable1728544206719 implements MigrationInterface {
  name = 'CreateCompetentieTable1728544206719';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "competentie" ("competentieID" SERIAL NOT NULL, "naam" character varying NOT NULL, "beschrijving" character varying NOT NULL, CONSTRAINT "PK_23f04e3c5622f2cb282443b94ff" PRIMARY KEY ("competentieID"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "competentie"`);
  }
}
