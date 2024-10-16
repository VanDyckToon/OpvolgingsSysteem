import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedAuth1729066061216 implements MigrationInterface {
    name = 'CreatedAuth1729066061216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD CONSTRAINT "UQ_a4b45aa4132bc6cf02410c67361" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP CONSTRAINT "UQ_a4b45aa4132bc6cf02410c67361"`);
    }

}
