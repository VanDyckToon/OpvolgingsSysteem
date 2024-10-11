import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGebruikerTable1728569843949 implements MigrationInterface {
    name = 'CreateGebruikerTable1728569843949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "gebruiker" ("gebruikerID" SERIAL NOT NULL, "voornaam" character varying NOT NULL, "achternaam" character varying NOT NULL, "straat" character varying, "huisNummer" character varying, "postcode" character varying, "woonplaats" character varying, "rijksregisternummer" character varying, "datumInDienst" TIMESTAMP, "verplaatsingWerk" character varying, "nationaliteit" character varying, "geboortePlaats" character varying, "geboorteDatum" TIMESTAMP, "mutualiteit" character varying, "uitbetalingsInstelling" character varying, "rijbewijs" character varying, "ICENaam" character varying, "ICETelefoonnummer" character varying, "GTB_VDAB" character varying, "OCMW" character varying, "BegeleidWonen" character varying, "andere" character varying, "foto" character varying, "rolID" integer, CONSTRAINT "PK_04f23255808dec2688086aa4f35" PRIMARY KEY ("gebruikerID"))`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD CONSTRAINT "FK_6a115deaa7d8d90f4cbb52341cb" FOREIGN KEY ("rolID") REFERENCES "rol"("rolID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP CONSTRAINT "FK_6a115deaa7d8d90f4cbb52341cb"`);
        await queryRunner.query(`DROP TABLE "gebruiker"`);
    }

}
