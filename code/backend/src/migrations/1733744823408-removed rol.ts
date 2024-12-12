import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedRol1733744823408 implements MigrationInterface {
    name = 'RemovedRol1733744823408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker_subgroep" DROP CONSTRAINT "FK_b71f972e0591727147c25ac0836"`);
        await queryRunner.query(`ALTER TABLE "gebruiker_subgroep" DROP COLUMN "rolID"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker_subgroep" ADD "rolID" integer`);
        await queryRunner.query(`ALTER TABLE "gebruiker_subgroep" ADD CONSTRAINT "FK_b71f972e0591727147c25ac0836" FOREIGN KEY ("rolID") REFERENCES "rol"("rolID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
