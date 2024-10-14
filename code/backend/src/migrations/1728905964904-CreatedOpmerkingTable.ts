import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedOpmerkingTable1728905964904 implements MigrationInterface {
    name = 'CreatedOpmerkingTable1728905964904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "opmerking" ("opmerkingID" SERIAL NOT NULL, "titel" character varying NOT NULL, "beschrijving" character varying NOT NULL, "werknemerID" integer, "begeleiderID" integer, CONSTRAINT "PK_41f4809211c8969285a821bbc2b" PRIMARY KEY ("opmerkingID"))`);
        await queryRunner.query(`ALTER TABLE "opmerking" ADD CONSTRAINT "FK_c0f50f7e761ba2b8344aed6bc90" FOREIGN KEY ("werknemerID") REFERENCES "gebruiker"("gebruikerID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "opmerking" ADD CONSTRAINT "FK_1c86930ca3345f09ce93b447297" FOREIGN KEY ("begeleiderID") REFERENCES "gebruiker"("gebruikerID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "opmerking" DROP CONSTRAINT "FK_1c86930ca3345f09ce93b447297"`);
        await queryRunner.query(`ALTER TABLE "opmerking" DROP CONSTRAINT "FK_c0f50f7e761ba2b8344aed6bc90"`);
        await queryRunner.query(`DROP TABLE "opmerking"`);
    }

}
