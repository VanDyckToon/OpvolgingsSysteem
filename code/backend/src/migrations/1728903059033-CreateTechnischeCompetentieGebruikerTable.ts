import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTechnischeCompetentieGebruikerTable1728903059033 implements MigrationInterface {
    name = 'CreateTechnischeCompetentieGebruikerTable1728903059033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "technische_competentie_gebruiker" ("technischeCompetentieGebruikerID" SERIAL NOT NULL, "datumBeoordeeld" TIMESTAMP NOT NULL, "gebruikerID" integer, "scoreID" integer, "technischeCompetentieID" integer, CONSTRAINT "PK_070146bf1da5a2f513392016089" PRIMARY KEY ("technischeCompetentieGebruikerID"))`);
        await queryRunner.query(`ALTER TABLE "technische_competentie_gebruiker" ADD CONSTRAINT "FK_b0052cf1931bc885f41b34e6c6d" FOREIGN KEY ("gebruikerID") REFERENCES "gebruiker"("gebruikerID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "technische_competentie_gebruiker" ADD CONSTRAINT "FK_34708fafb2ca8c28e73efc60a21" FOREIGN KEY ("scoreID") REFERENCES "score"("scoreID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "technische_competentie_gebruiker" ADD CONSTRAINT "FK_ed5b895a573b1b4ea07bf1c3d0a" FOREIGN KEY ("technischeCompetentieID") REFERENCES "technische_competentie"("technischeCompetentieID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "technische_competentie_gebruiker" DROP CONSTRAINT "FK_ed5b895a573b1b4ea07bf1c3d0a"`);
        await queryRunner.query(`ALTER TABLE "technische_competentie_gebruiker" DROP CONSTRAINT "FK_34708fafb2ca8c28e73efc60a21"`);
        await queryRunner.query(`ALTER TABLE "technische_competentie_gebruiker" DROP CONSTRAINT "FK_b0052cf1931bc885f41b34e6c6d"`);
        await queryRunner.query(`DROP TABLE "technische_competentie_gebruiker"`);
    }

}
