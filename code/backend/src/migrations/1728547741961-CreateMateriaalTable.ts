import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMateriaalTable1728547741961 implements MigrationInterface {
    name = 'CreateMateriaalTable1728547741961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "materiaal" ("materiaalID" SERIAL NOT NULL, "beschrijving" character varying NOT NULL, CONSTRAINT "PK_c43eea1e8115e4c887090b70d24" PRIMARY KEY ("materiaalID"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "materiaal"`);
    }

}
