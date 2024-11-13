import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedColorCodeToDB1730721248303 implements MigrationInterface {
    name = 'AddedColorCodeToDB1730721248303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "score" ADD "kleurcode" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "score" DROP COLUMN "kleurcode"`);
    }

}
