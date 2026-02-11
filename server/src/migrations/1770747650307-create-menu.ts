import type { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMenu1770747650307 implements MigrationInterface {
    name = 'CreateMenu1770747650307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Menu" ("id" int NOT NULL IDENTITY(1,1), "path" varchar(1024), "icon" varchar(128) NOT NULL, "name" varchar(512) NOT NULL, "mpath" nvarchar(255) CONSTRAINT "DF_ce23145c2ec228a128ffb3c28db" DEFAULT '', "parentId" int, CONSTRAINT "PK_b2683c330c5e6d700266a6f46d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Menu" ADD CONSTRAINT "FK_c4c5fa3bc158c089f076ec35d08" FOREIGN KEY ("parentId") REFERENCES "Menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Menu" DROP CONSTRAINT "FK_c4c5fa3bc158c089f076ec35d08"`);
        await queryRunner.query(`DROP TABLE "Menu"`);
    }

}
