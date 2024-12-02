import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedManyToMany1732533019346 implements MigrationInterface {
    name = 'CreatedManyToMany1732533019346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "gebruiker_subgroep" ("gebruikerSubgroepID" SERIAL NOT NULL, "gebruikerID" integer, "subgroepID" integer, CONSTRAINT "PK_90c9f24d25bc10b8077447e59d7" PRIMARY KEY ("gebruikerSubgroepID"))`);
        await queryRunner.query(`ALTER TABLE "gebruiker_subgroep" ADD CONSTRAINT "FK_1a1766ca7bc042a20d5a154b7e2" FOREIGN KEY ("gebruikerID") REFERENCES "gebruiker"("gebruikerID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gebruiker_subgroep" ADD CONSTRAINT "FK_d7131564517ee79c91f0a4b54fc" FOREIGN KEY ("subgroepID") REFERENCES "subgroep"("subgroepID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gebruiker_subgroep" DROP CONSTRAINT "FK_d7131564517ee79c91f0a4b54fc"`);
        await queryRunner.query(`ALTER TABLE "gebruiker_subgroep" DROP CONSTRAINT "FK_1a1766ca7bc042a20d5a154b7e2"`);
        await queryRunner.query(`DROP TABLE "gebruiker_subgroep"`);
    }

}
