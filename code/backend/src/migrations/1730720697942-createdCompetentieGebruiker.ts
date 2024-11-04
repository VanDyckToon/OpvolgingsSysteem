import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatedCompetentieGebruiker1730720697942
  implements MigrationInterface
{
  name = 'CreatedCompetentieGebruiker1730720697942';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "competentie_gebruiker" ("competentieGebruikerID" SERIAL NOT NULL, "datumBeoordeeld" TIMESTAMP NOT NULL, "gebruikerID" integer, "scoreID" integer, "competentieID" integer, CONSTRAINT "PK_1fbff82e70e1143ac3b6f6c2ddc" PRIMARY KEY ("competentieGebruikerID"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "competentie_gebruiker" ADD CONSTRAINT "FK_3ebf041b4bf40660fd7d9723896" FOREIGN KEY ("gebruikerID") REFERENCES "gebruiker"("gebruikerID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "competentie_gebruiker" ADD CONSTRAINT "FK_fdb839f4a18e7661d6e107ee967" FOREIGN KEY ("scoreID") REFERENCES "score"("scoreID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "competentie_gebruiker" ADD CONSTRAINT "FK_5f71fc989e686f8d699571ff8ca" FOREIGN KEY ("competentieID") REFERENCES "competentie"("competentieID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "competentie_gebruiker" DROP CONSTRAINT "FK_5f71fc989e686f8d699571ff8ca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "competentie_gebruiker" DROP CONSTRAINT "FK_fdb839f4a18e7661d6e107ee967"`,
    );
    await queryRunner.query(
      `ALTER TABLE "competentie_gebruiker" DROP CONSTRAINT "FK_3ebf041b4bf40660fd7d9723896"`,
    );
    await queryRunner.query(`DROP TABLE "competentie_gebruiker"`);
  }
}
