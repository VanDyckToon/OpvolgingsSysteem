import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedTelnumberEtc1729509603639 implements MigrationInterface {
    name = 'AddedTelnumberEtc1729509603639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD "telefoonnummer" character varying`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD CONSTRAINT "UQ_ecc969fa3f9bb267946d53a7c2f" UNIQUE ("telefoonnummer")`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD "extraOpmerking" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP COLUMN "extraOpmerking"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP CONSTRAINT "UQ_ecc969fa3f9bb267946d53a7c2f"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP COLUMN "telefoonnummer"`);
    }

}
