import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedDB1728636384352 implements MigrationInterface {
    name = 'CreatedDB1728636384352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "gebruiker" ("gebruikerID" SERIAL NOT NULL, "voornaam" character varying NOT NULL, "achternaam" character varying NOT NULL, "straat" character varying, "huisNummer" character varying, "postcode" character varying, "woonplaats" character varying, "rijksregisternummer" character varying, "datumInDienst" TIMESTAMP, "verplaatsingWerk" character varying, "nationaliteit" character varying, "geboortePlaats" character varying, "geboorteDatum" TIMESTAMP, "mutualiteit" character varying, "uitbetalingsInstelling" character varying, "rijbewijs" character varying, "ICENaam" character varying, "ICETelefoonnummer" character varying, "GTB_VDAB" character varying, "OCMW" character varying, "BegeleidWonen" character varying, "andere" character varying, "foto" character varying, "rolRolID" integer, CONSTRAINT "PK_04f23255808dec2688086aa4f35" PRIMARY KEY ("gebruikerID"))`);
        await queryRunner.query(`CREATE TABLE "rol" ("rolID" SERIAL NOT NULL, "naam" character varying NOT NULL, CONSTRAINT "PK_cf995a472f57db974ff9f06947d" PRIMARY KEY ("rolID"))`);
        await queryRunner.query(`CREATE TABLE "competentie" ("competentieID" SERIAL NOT NULL, "naam" character varying NOT NULL, "beschrijving" character varying NOT NULL, CONSTRAINT "PK_23f04e3c5622f2cb282443b94ff" PRIMARY KEY ("competentieID"))`);
        await queryRunner.query(`CREATE TABLE "materiaal" ("materiaalID" SERIAL NOT NULL, "beschrijving" character varying NOT NULL, CONSTRAINT "PK_c43eea1e8115e4c887090b70d24" PRIMARY KEY ("materiaalID"))`);
        await queryRunner.query(`CREATE TABLE "opleiding" ("opleidingID" SERIAL NOT NULL, "naam" character varying NOT NULL, "intern" boolean NOT NULL, "datumStart" TIMESTAMP NOT NULL, "datumEind" TIMESTAMP NOT NULL, CONSTRAINT "PK_91639b6e02a8fd6933b5d373d99" PRIMARY KEY ("opleidingID"))`);
        await queryRunner.query(`CREATE TABLE "technische_competentie" ("technischeCompetentieID" SERIAL NOT NULL, "naam" character varying NOT NULL, "beschrijving" character varying NOT NULL, "taakID" integer, CONSTRAINT "PK_9f69eeae667dfe5c556b644e017" PRIMARY KEY ("technischeCompetentieID"))`);
        await queryRunner.query(`CREATE TABLE "taak" ("taakID" SERIAL NOT NULL, "naam" character varying NOT NULL, "groepID" integer, CONSTRAINT "PK_1c29cf4c9b095ef3d6d4204bd4b" PRIMARY KEY ("taakID"))`);
        await queryRunner.query(`CREATE TABLE "groep" ("groepID" SERIAL NOT NULL, "naam" character varying NOT NULL, CONSTRAINT "PK_962107acf3e4c6b68e3d79d61e7" PRIMARY KEY ("groepID"))`);
        await queryRunner.query(`CREATE TABLE "score" ("scoreID" SERIAL NOT NULL, "scoreNaam" character varying NOT NULL, "waarde" double precision NOT NULL, CONSTRAINT "PK_e1b4ecb2676e7314e4551f3c6ce" PRIMARY KEY ("scoreID"))`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD CONSTRAINT "FK_aab0cabf81b7de1ad39c0dce2c8" FOREIGN KEY ("rolRolID") REFERENCES "rol"("rolID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "technische_competentie" ADD CONSTRAINT "FK_8688ffec3d83f639dfcf8db6266" FOREIGN KEY ("taakID") REFERENCES "taak"("taakID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "taak" ADD CONSTRAINT "FK_cb50137229f41150881b973ec8c" FOREIGN KEY ("groepID") REFERENCES "groep"("groepID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "taak" DROP CONSTRAINT "FK_cb50137229f41150881b973ec8c"`);
        await queryRunner.query(`ALTER TABLE "technische_competentie" DROP CONSTRAINT "FK_8688ffec3d83f639dfcf8db6266"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP CONSTRAINT "FK_aab0cabf81b7de1ad39c0dce2c8"`);
        await queryRunner.query(`DROP TABLE "score"`);
        await queryRunner.query(`DROP TABLE "groep"`);
        await queryRunner.query(`DROP TABLE "taak"`);
        await queryRunner.query(`DROP TABLE "technische_competentie"`);
        await queryRunner.query(`DROP TABLE "opleiding"`);
        await queryRunner.query(`DROP TABLE "materiaal"`);
        await queryRunner.query(`DROP TABLE "competentie"`);
        await queryRunner.query(`DROP TABLE "rol"`);
        await queryRunner.query(`DROP TABLE "gebruiker"`);
    }

}
