import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSubgroepTable1728645594034 implements MigrationInterface {
    name = 'CreateSubgroepTable1728645594034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP CONSTRAINT "FK_6a115deaa7d8d90f4cbb52341cb"`);
        await queryRunner.query(`CREATE TABLE "subgroep" ("subgroepID" SERIAL NOT NULL, "subgroepNaam" character varying NOT NULL, "groepID" integer, CONSTRAINT "PK_adfab4d82a51127989534953b18" PRIMARY KEY ("subgroepID"))`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP COLUMN "rolID"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD "rijksregisternummer" character varying`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD "datumInDienst" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD "verplaatsingWerk" character varying`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD "nationaliteit" character varying`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD "geboortePlaats" character varying`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD "geboorteDatum" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD "mutualiteit" character varying`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD "uitbetalingsInstelling" character varying`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD "rijbewijs" character varying`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD "GTB_VDAB" character varying`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD "OCMW" character varying`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD "BegeleidWonen" character varying`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD "andere" character varying`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD "rolRolID" integer`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD "subgroepID" integer`);
        await queryRunner.query(`ALTER TABLE "subgroep" ADD CONSTRAINT "FK_580b6cf28228f21fb3980e8886b" FOREIGN KEY ("groepID") REFERENCES "groep"("groepID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD CONSTRAINT "FK_aab0cabf81b7de1ad39c0dce2c8" FOREIGN KEY ("rolRolID") REFERENCES "rol"("rolID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD CONSTRAINT "FK_d037dc45316c3deb359416d814d" FOREIGN KEY ("subgroepID") REFERENCES "subgroep"("subgroepID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP CONSTRAINT "FK_d037dc45316c3deb359416d814d"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP CONSTRAINT "FK_aab0cabf81b7de1ad39c0dce2c8"`);
        await queryRunner.query(`ALTER TABLE "subgroep" DROP CONSTRAINT "FK_580b6cf28228f21fb3980e8886b"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP COLUMN "subgroepID"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP COLUMN "rolRolID"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP COLUMN "andere"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP COLUMN "BegeleidWonen"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP COLUMN "OCMW"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP COLUMN "GTB_VDAB"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP COLUMN "rijbewijs"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP COLUMN "uitbetalingsInstelling"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP COLUMN "mutualiteit"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP COLUMN "geboorteDatum"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP COLUMN "geboortePlaats"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP COLUMN "nationaliteit"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP COLUMN "verplaatsingWerk"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP COLUMN "datumInDienst"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP COLUMN "rijksregisternummer"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD "rolID" integer`);
        await queryRunner.query(`DROP TABLE "subgroep"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD CONSTRAINT "FK_6a115deaa7d8d90f4cbb52341cb" FOREIGN KEY ("rolID") REFERENCES "rol"("rolID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
