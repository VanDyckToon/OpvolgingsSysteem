import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedTransform1728570295568 implements MigrationInterface {
    name = 'AddedTransform1728570295568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP CONSTRAINT "FK_6a115deaa7d8d90f4cbb52341cb"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" RENAME COLUMN "rolID" TO "rolRolID"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD CONSTRAINT "FK_aab0cabf81b7de1ad39c0dce2c8" FOREIGN KEY ("rolRolID") REFERENCES "rol"("rolID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP CONSTRAINT "FK_aab0cabf81b7de1ad39c0dce2c8"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" RENAME COLUMN "rolRolID" TO "rolID"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD CONSTRAINT "FK_6a115deaa7d8d90f4cbb52341cb" FOREIGN KEY ("rolID") REFERENCES "rol"("rolID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
