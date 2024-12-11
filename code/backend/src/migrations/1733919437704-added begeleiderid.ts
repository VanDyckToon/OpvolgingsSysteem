import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedBegeleiderid1733919437704 implements MigrationInterface {
    name = 'AddedBegeleiderid1733919437704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker" RENAME COLUMN "begeleidID" TO "begeleiderID"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker" RENAME COLUMN "begeleiderID" TO "begeleidID"`);
    }

}
