import { MigrationInterface, QueryRunner } from "typeorm";

export class EenWNKanEenBegeleiderHebben1728651484332 implements MigrationInterface {
    name = 'EenWNKanEenBegeleiderHebben1728651484332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD "begeleiderID" integer`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD CONSTRAINT "FK_b86cac10a0abfa7bdb27d7a80d7" FOREIGN KEY ("begeleiderID") REFERENCES "gebruiker"("gebruikerID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP CONSTRAINT "FK_b86cac10a0abfa7bdb27d7a80d7"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP COLUMN "begeleiderID"`);
    }

}
