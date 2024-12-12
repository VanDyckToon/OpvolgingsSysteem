import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedGebruikerTable1733491493690 implements MigrationInterface {
    name = 'ChangedGebruikerTable1733491493690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP CONSTRAINT "FK_b86cac10a0abfa7bdb27d7a80d7"`);
        await queryRunner.query(`CREATE TABLE "gebruikers_begeleiders" ("gebruikerID" integer NOT NULL, "begeleiderID" integer NOT NULL, CONSTRAINT "PK_d583014c32198f2d3e358829e93" PRIMARY KEY ("gebruikerID", "begeleiderID"))`);
        await queryRunner.query(`CREATE INDEX "IDX_39fb3911c0bf8fba0100f62b6a" ON "gebruikers_begeleiders" ("gebruikerID") `);
        await queryRunner.query(`CREATE INDEX "IDX_366a9dd9c2a773f66243eafad9" ON "gebruikers_begeleiders" ("begeleiderID") `);
        await queryRunner.query(`ALTER TABLE "gebruiker" DROP COLUMN "begeleiderID"`);
        await queryRunner.query(`ALTER TABLE "gebruikers_begeleiders" ADD CONSTRAINT "FK_39fb3911c0bf8fba0100f62b6a3" FOREIGN KEY ("gebruikerID") REFERENCES "gebruiker"("gebruikerID") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "gebruikers_begeleiders" ADD CONSTRAINT "FK_366a9dd9c2a773f66243eafad9c" FOREIGN KEY ("begeleiderID") REFERENCES "gebruiker"("gebruikerID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruikers_begeleiders" DROP CONSTRAINT "FK_366a9dd9c2a773f66243eafad9c"`);
        await queryRunner.query(`ALTER TABLE "gebruikers_begeleiders" DROP CONSTRAINT "FK_39fb3911c0bf8fba0100f62b6a3"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD "begeleiderID" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_366a9dd9c2a773f66243eafad9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_39fb3911c0bf8fba0100f62b6a"`);
        await queryRunner.query(`DROP TABLE "gebruikers_begeleiders"`);
        await queryRunner.query(`ALTER TABLE "gebruiker" ADD CONSTRAINT "FK_b86cac10a0abfa7bdb27d7a80d7" FOREIGN KEY ("begeleiderID") REFERENCES "gebruiker"("gebruikerID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
