import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedGebruikerTable1733491707182 implements MigrationInterface {
    name = 'ChangedGebruikerTable1733491707182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP CONSTRAINT "FK_d037dc45316c3deb359416d814d"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" RENAME COLUMN "subgroepID" TO "subgroepSubgroepID"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD CONSTRAINT "FK_c3b7fe922f57a0ef4194c6a97e5" FOREIGN KEY ("subgroepSubgroepID") REFERENCES "subgroep"("subgroepID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP CONSTRAINT "FK_c3b7fe922f57a0ef4194c6a97e5"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" RENAME COLUMN "subgroepSubgroepID" TO "subgroepID"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD CONSTRAINT "FK_d037dc45316c3deb359416d814d" FOREIGN KEY ("subgroepID") REFERENCES "subgroep"("subgroepID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
