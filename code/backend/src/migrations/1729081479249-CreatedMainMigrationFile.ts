import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedMainMigrationFile1729081479249 implements MigrationInterface {
    name = 'CreatedMainMigrationFile1729081479249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "gebruiker" ("gebruikerID" SERIAL NOT NULL, "voornaam" character varying NOT NULL, "achternaam" character varying NOT NULL, "email" character varying, "wachtwoord" character varying, "straat" character varying, "huisNummer" character varying, "postcode" character varying, "woonplaats" character varying, "ICENaam" character varying, "ICETelefoonnummer" character varying, "foto" character varying, "rolRolID" integer, "subgroepID" integer, "begeleiderID" integer, CONSTRAINT "UQ_a4b45aa4132bc6cf02410c67361" UNIQUE ("email"), CONSTRAINT "PK_04f23255808dec2688086aa4f35" PRIMARY KEY ("gebruikerID"))`);
        await queryRunner.query(`ALTER TABLE "opleiding_gebruiker" ADD CONSTRAINT "FK_f0a930dfdc810be1c0cd271ea18" FOREIGN KEY ("gebruikerID") REFERENCES "gebruiker"("gebruikerID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "competentie_gebruiker" ADD CONSTRAINT "FK_3ebf041b4bf40660fd7d9723896" FOREIGN KEY ("gebruikerID") REFERENCES "gebruiker"("gebruikerID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "technische_competentie_gebruiker" ADD CONSTRAINT "FK_b0052cf1931bc885f41b34e6c6d" FOREIGN KEY ("gebruikerID") REFERENCES "gebruiker"("gebruikerID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "opmerking" ADD CONSTRAINT "FK_c0f50f7e761ba2b8344aed6bc90" FOREIGN KEY ("werknemerID") REFERENCES "gebruiker"("gebruikerID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "opmerking" ADD CONSTRAINT "FK_1c86930ca3345f09ce93b447297" FOREIGN KEY ("begeleiderID") REFERENCES "gebruiker"("gebruikerID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD CONSTRAINT "FK_aab0cabf81b7de1ad39c0dce2c8" FOREIGN KEY ("rolRolID") REFERENCES "rol"("rolID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD CONSTRAINT "FK_d037dc45316c3deb359416d814d" FOREIGN KEY ("subgroepID") REFERENCES "subgroep"("subgroepID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD CONSTRAINT "FK_b86cac10a0abfa7bdb27d7a80d7" FOREIGN KEY ("begeleiderID") REFERENCES "gebruiker"("gebruikerID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP CONSTRAINT "FK_b86cac10a0abfa7bdb27d7a80d7"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP CONSTRAINT "FK_d037dc45316c3deb359416d814d"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP CONSTRAINT "FK_aab0cabf81b7de1ad39c0dce2c8"`);
        await queryRunner.query(`ALTER TABLE "opmerking" DROP CONSTRAINT "FK_1c86930ca3345f09ce93b447297"`);
        await queryRunner.query(`ALTER TABLE "opmerking" DROP CONSTRAINT "FK_c0f50f7e761ba2b8344aed6bc90"`);
        await queryRunner.query(`ALTER TABLE "technische_competentie_gebruiker" DROP CONSTRAINT "FK_b0052cf1931bc885f41b34e6c6d"`);
        await queryRunner.query(`ALTER TABLE "competentie_gebruiker" DROP CONSTRAINT "FK_3ebf041b4bf40660fd7d9723896"`);
        await queryRunner.query(`ALTER TABLE "opleiding_gebruiker" DROP CONSTRAINT "FK_f0a930dfdc810be1c0cd271ea18"`);
        await queryRunner.query(`DROP TABLE "gebruiker"`);
    }

}
