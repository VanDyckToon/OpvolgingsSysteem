import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedBegeleiderCol1732546270367 implements MigrationInterface {
    name = 'AddedBegeleiderCol1732546270367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker_subgroep" ADD "begeleiderID" integer`);
        await queryRunner.query(`ALTER TABLE "gebruiker_subgroep" ADD CONSTRAINT "FK_42ca275bf5dc2866839af245550" FOREIGN KEY ("begeleiderID") REFERENCES "gebruiker"("gebruikerID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker_subgroep" DROP CONSTRAINT "FK_42ca275bf5dc2866839af245550"`);
        await queryRunner.query(`ALTER TABLE "gebruiker_subgroep" DROP COLUMN "begeleiderID"`);
    }

}
