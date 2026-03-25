import type { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDb1773923187235 implements MigrationInterface {
    name = 'CreateDb1773923187235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Menu" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "visible" boolean NOT NULL, "path" varchar(1024), "icon" varchar(128) NOT NULL, "name" varchar(512) NOT NULL, "mpath" varchar DEFAULT (''), "parentId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_Menu" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "visible" boolean NOT NULL, "path" varchar(1024), "icon" varchar(128) NOT NULL, "name" varchar(512) NOT NULL, "mpath" varchar DEFAULT (''), "parentId" integer, CONSTRAINT "FK_c4c5fa3bc158c089f076ec35d08" FOREIGN KEY ("parentId") REFERENCES "Menu" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_Menu"("id", "visible", "path", "icon", "name", "mpath", "parentId") SELECT "id", "visible", "path", "icon", "name", "mpath", "parentId" FROM "Menu"`);
        await queryRunner.query(`DROP TABLE "Menu"`);
        await queryRunner.query(`ALTER TABLE "temporary_Menu" RENAME TO "Menu"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Menu" RENAME TO "temporary_Menu"`);
        await queryRunner.query(`CREATE TABLE "Menu" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "visible" boolean NOT NULL, "path" varchar(1024), "icon" varchar(128) NOT NULL, "name" varchar(512) NOT NULL, "mpath" varchar DEFAULT (''), "parentId" integer)`);
        await queryRunner.query(`INSERT INTO "Menu"("id", "visible", "path", "icon", "name", "mpath", "parentId") SELECT "id", "visible", "path", "icon", "name", "mpath", "parentId" FROM "temporary_Menu"`);
        await queryRunner.query(`DROP TABLE "temporary_Menu"`);
        await queryRunner.query(`DROP TABLE "Menu"`);
    }

}
