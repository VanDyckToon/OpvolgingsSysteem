import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangedGebruikersTable1728645502715 implements MigrationInterface {
  name = 'ChangedGebruikersTable1728645502715';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "gebruiker" ("gebruikerID" SERIAL NOT NULL, "voornaam" character varying NOT NULL, "achternaam" character varying NOT NULL, "straat" character varying, "huisNummer" character varying, "postcode" character varying, "woonplaats" character varying, "ICENaam" character varying, "ICETelefoonnummer" character varying, "foto" character varying, "rolID" integer, CONSTRAINT "PK_04f23255808dec2688086aa4f35" PRIMARY KEY ("gebruikerID"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "gebruiker" ADD CONSTRAINT "FK_6a115deaa7d8d90f4cbb52341cb" FOREIGN KEY ("rolID") REFERENCES "rol"("rolID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "gebruiker" DROP CONSTRAINT "FK_6a115deaa7d8d90f4cbb52341cb"`,
    );
    await queryRunner.query(`DROP TABLE "gebruiker"`);
  }
}
