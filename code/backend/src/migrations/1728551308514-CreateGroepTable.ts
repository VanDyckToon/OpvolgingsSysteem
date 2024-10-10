import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGroepTable1728551308514 implements MigrationInterface {
    name = 'CreateGroepTable1728551308514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "groep" ("groepID" SERIAL NOT NULL, "naam" character varying NOT NULL, CONSTRAINT "PK_962107acf3e4c6b68e3d79d61e7" PRIMARY KEY ("groepID"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "groep"`);
    }

}
