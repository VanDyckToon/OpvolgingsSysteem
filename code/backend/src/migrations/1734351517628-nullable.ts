import { MigrationInterface, QueryRunner } from "typeorm";

export class Nullable1734351517628 implements MigrationInterface {
    name = 'Nullable1734351517628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker_subgroep" DROP CONSTRAINT "FK_42ca275bf5dc2866839af245550"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP CONSTRAINT "FK_b86cac10a0abfa7bdb27d7a80d7"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP CONSTRAINT "FK_d037dc45316c3deb359416d814d"`);
        await queryRunner.query(`ALTER TABLE "gebruiker_subgroep" DROP COLUMN "begeleiderID"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD "subgroepSubgroepID" integer`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD CONSTRAINT "FK_c3b7fe922f57a0ef4194c6a97e5" FOREIGN KEY ("subgroepSubgroepID") REFERENCES "subgroep"("subgroepID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP CONSTRAINT "FK_c3b7fe922f57a0ef4194c6a97e5"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP COLUMN "subgroepSubgroepID"`);
        await queryRunner.query(`ALTER TABLE "gebruiker_subgroep" ADD "begeleiderID" integer`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD CONSTRAINT "FK_d037dc45316c3deb359416d814d" FOREIGN KEY ("subgroepID") REFERENCES "subgroep"("subgroepID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD CONSTRAINT "FK_b86cac10a0abfa7bdb27d7a80d7" FOREIGN KEY ("begeleiderID") REFERENCES "gebruiker"("gebruikerID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gebruiker_subgroep" ADD CONSTRAINT "FK_42ca275bf5dc2866839af245550" FOREIGN KEY ("begeleiderID") REFERENCES "gebruiker"("gebruikerID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
