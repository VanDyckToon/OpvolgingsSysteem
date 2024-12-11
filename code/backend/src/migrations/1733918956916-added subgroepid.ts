import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedSubgroepid1733918956916 implements MigrationInterface {
    name = 'AddedSubgroepid1733918956916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD "subgroepID" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP COLUMN "subgroepID"`);
    }

}
