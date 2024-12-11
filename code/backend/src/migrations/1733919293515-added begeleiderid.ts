import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedBegeleiderid1733919293515 implements MigrationInterface {
    name = 'AddedBegeleiderid1733919293515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD "begeleidID" integer`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP COLUMN "subgroepID"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD "subgroepID" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP COLUMN "subgroepID"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD "subgroepID" character varying`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP COLUMN "begeleidID"`);
    }

}
