import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTaakMateriaalTable1728642780038 implements MigrationInterface {
    name = 'CreateTaakMateriaalTable1728642780038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "taak_materiaal" ("taakMateriaalID" SERIAL NOT NULL, "taakID" integer, "materiaalID" integer, CONSTRAINT "PK_d86060e1e8f786cf5afc5ef4b1e" PRIMARY KEY ("taakMateriaalID"))`);
        await queryRunner.query(`ALTER TABLE "taak_materiaal" ADD CONSTRAINT "FK_d54e204a838c35c75c28f64bac5" FOREIGN KEY ("taakID") REFERENCES "taak"("taakID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "taak_materiaal" ADD CONSTRAINT "FK_5454dbb0321c66f387553cc3fcc" FOREIGN KEY ("materiaalID") REFERENCES "materiaal"("materiaalID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "taak_materiaal" DROP CONSTRAINT "FK_5454dbb0321c66f387553cc3fcc"`);
        await queryRunner.query(`ALTER TABLE "taak_materiaal" DROP CONSTRAINT "FK_d54e204a838c35c75c28f64bac5"`);
        await queryRunner.query(`DROP TABLE "taak_materiaal"`);
    }

}
