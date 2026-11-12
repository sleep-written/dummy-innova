import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDb1794317853121 implements MigrationInterface {
    name = 'CreateDb1794317853121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "menu_permission" ("id" int NOT NULL IDENTITY(1,1), "menuId" int, "userTypeId" int, CONSTRAINT "PK_7a69d87de538c0e8ad05c1a1820" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu" ("id" int NOT NULL IDENTITY(1,1), "path" varchar(128), "icon" varchar(64) NOT NULL, "text" nvarchar(128) NOT NULL, "parentId" int, CONSTRAINT "PK_35b2a8f47d153ff7a41860cceeb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "proc_materials" ("material" int NOT NULL IDENTITY(1,1), "code" nvarchar(60) COLLATE Danish_Norwegian_CI_AS NOT NULL, "name" nvarchar(60) COLLATE Danish_Norwegian_CI_AS NOT NULL, "active" bit NOT NULL, "pkpackaging" int, "itpackaging" int, CONSTRAINT "PK_60b915de6f4a706bbb3e4607c7f" PRIMARY KEY ("material"))`);
        await queryRunner.query(`CREATE TABLE "user_type" ("id" int NOT NULL IDENTITY(1,1), "guest" bit NOT NULL, "code" varchar(32) NOT NULL, "description" nvarchar(128) NOT NULL, "createProcMaterials" bit NOT NULL CONSTRAINT "DF_182d0b62dba410047ece0aad20b" DEFAULT 0, "updateProcMaterials" bit NOT NULL CONSTRAINT "DF_aac232cd2f2074860e24e946a90" DEFAULT 0, "deleteProcMaterials" bit NOT NULL CONSTRAINT "DF_c0bddbee1d7697ed03d99e2ec1e" DEFAULT 0, CONSTRAINT "PK_1f9c6d05869e094dee8fa7d392a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" int NOT NULL IDENTITY(1,1), "username" varchar(32) NOT NULL, "password" varchar(128) NOT NULL, "userTypeId" int, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "menu_permission" ADD CONSTRAINT "FK_c57de8fc6071e94f9fd4199980c" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_permission" ADD CONSTRAINT "FK_e4012c1faaf22859f6089400646" FOREIGN KEY ("userTypeId") REFERENCES "user_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu" ADD CONSTRAINT "FK_23ac1b81a7bfb85b14e86bd23a5" FOREIGN KEY ("parentId") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_materials" ADD CONSTRAINT "FK_83622d06b8b76b55a9c0d4130c8" FOREIGN KEY ("pkpackaging") REFERENCES "proc_materials"("material") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_materials" ADD CONSTRAINT "FK_7d82f5e9e69f348855248a3dc1f" FOREIGN KEY ("itpackaging") REFERENCES "proc_materials"("material") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_29f29dffce2845a1abc901d4e85" FOREIGN KEY ("userTypeId") REFERENCES "user_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_29f29dffce2845a1abc901d4e85"`);
        await queryRunner.query(`ALTER TABLE "proc_materials" DROP CONSTRAINT "FK_7d82f5e9e69f348855248a3dc1f"`);
        await queryRunner.query(`ALTER TABLE "proc_materials" DROP CONSTRAINT "FK_83622d06b8b76b55a9c0d4130c8"`);
        await queryRunner.query(`ALTER TABLE "menu" DROP CONSTRAINT "FK_23ac1b81a7bfb85b14e86bd23a5"`);
        await queryRunner.query(`ALTER TABLE "menu_permission" DROP CONSTRAINT "FK_e4012c1faaf22859f6089400646"`);
        await queryRunner.query(`ALTER TABLE "menu_permission" DROP CONSTRAINT "FK_c57de8fc6071e94f9fd4199980c"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_type"`);
        await queryRunner.query(`DROP TABLE "proc_materials"`);
        await queryRunner.query(`DROP TABLE "menu"`);
        await queryRunner.query(`DROP TABLE "menu_permission"`);
    }
}
