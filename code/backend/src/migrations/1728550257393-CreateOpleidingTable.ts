import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOpleidingTable1728550257393 implements MigrationInterface {
    name = 'CreateOpleidingTable1728550257393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "opleiding" ("opleidingID" SERIAL NOT NULL, "naam" character varying NOT NULL, "intern" boolean NOT NULL, "datumStart" TIMESTAMP NOT NULL, "datumEind" TIMESTAMP NOT NULL, CONSTRAINT "PK_91639b6e02a8fd6933b5d373d99" PRIMARY KEY ("opleidingID"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "opleiding"`);
    }

}
