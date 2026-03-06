import type { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1770997972294 implements MigrationInterface {
    name = 'CreateDatabase1770997972294';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "base_companies" ("company" int NOT NULL IDENTITY(1,1), "active" bit NOT NULL CONSTRAINT "DF_fa78f139e5d39f7da5fb9aaa204" DEFAULT 0, "code" nvarchar(30) NOT NULL, "name" nvarchar(30) NOT NULL, "description8" nvarchar(80), CONSTRAINT "PK_4ba5794baa85ff9f19d0ffd14d1" PRIMARY KEY ("company"))`);
        await queryRunner.query(`CREATE TABLE "proc_expiremethods" ("expiremethod" int NOT NULL IDENTITY(1,1), "code" nvarchar(30) NOT NULL, "name" nvarchar(30) NOT NULL, "active" bit NOT NULL CONSTRAINT "DF_abacc8f21a16f9cec68b19c9519" DEFAULT 0, CONSTRAINT "PK_e951413d1099913bb85c7ca5b90" PRIMARY KEY ("expiremethod"))`);
        await queryRunner.query(`CREATE TABLE "proc_layouts" ("layout" int NOT NULL IDENTITY(1,1), "code" nvarchar(30) NOT NULL, "name" nvarchar(30) NOT NULL, "active" bit NOT NULL CONSTRAINT "DF_47b8dbc0b77a40a9ac7a7719e9b" DEFAULT 0, CONSTRAINT "PK_f1f9b12d596fdc5d92b471f3c7d" PRIMARY KEY ("layout"))`);
        await queryRunner.query(`CREATE TABLE "proc_orderl" ("id" int NOT NULL IDENTITY(1,1), "description1" nvarchar(80), "olstatus" smallint NOT NULL, "maxamount" real, "curamount" real, "expire1" int, "assigntype" smallint NOT NULL, "unittype" smallint NOT NULL, "amountum" smallint NOT NULL, "nolimit" bit NOT NULL, "isupdated" bit NOT NULL, "useco" bit NOT NULL, "packsizeum" smallint NOT NULL, "stacksizeum" smallint NOT NULL, "palletpsizeum" smallint NOT NULL, "palletssizeum" smallint NOT NULL, "allowchange" bit NOT NULL, "planstatus" smallint NOT NULL, "order" int, "material" int, "itlayout" int, "pklayout" int, "expire1method" int, "pkpackaging" int, "itpackaging" int, CONSTRAINT "PK_f7ff402e15fdf72f60556ec63d2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "proc_packs" ("id" int NOT NULL, "tare" real, "gross" real, "extcode" nvarchar(80), "pallet" int, "lot" int, CONSTRAINT "PK_f2a1d12ee073b5fb3ea09952f9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "proc_lots" ("lot" int NOT NULL IDENTITY(1,1), "code" nvarchar(30) NOT NULL, "extcode" nvarchar(30), CONSTRAINT "PK_0f4e5ae0f31e28249c4eec514c9" PRIMARY KEY ("lot"))`);
        await queryRunner.query(`CREATE TABLE "proc_items" ("id" int NOT NULL IDENTITY(1,1), "number" int NOT NULL, "pieces" int, "weight" real, "tare" real, "gross" real, "order" int, "lot" int, "material" int, CONSTRAINT "PK_c63636117cd5bda027f69d85564" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "proc_orders" ("order" int NOT NULL, "name" nvarchar(30) NOT NULL, "code" nvarchar(30) NOT NULL, "shname" nvarchar(10) NOT NULL, "extcode" nvarchar(30), "dimension1" int, "begtime" datetime, "endtime" datetime, "active" bit NOT NULL, "description1" nvarchar(80), "description2" nvarchar(80), "created" datetime NOT NULL, "modified" datetime NOT NULL, "orderstatus" tinyint NOT NULL, "transferstatus" tinyint NOT NULL, "numbermethod" tinyint NOT NULL, "ordertype" tinyint NOT NULL, "accepttype" tinyint NOT NULL, "amountum" smallint NOT NULL, "allowadd" bit NOT NULL, "customer" int, CONSTRAINT "PK_1cdb0ae1dfb067fd5cb7e0f8df9" PRIMARY KEY ("order"))`);
        await queryRunner.query(`CREATE TABLE "proc_collections" ("id" int NOT NULL IDENTITY(1,1), "number" int NOT NULL, "pieces" int, "units" int, "weight" real, "tare" real, "gross" real, "begtime" datetime NOT NULL, "endtime" datetime, "order" int, "lot" int, "material" int, CONSTRAINT "PK_ed62e3fba7a885970946a36d983" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "proc_materialtypes" ("materialtype" int NOT NULL IDENTITY(1,1), "code" nvarchar(30) NOT NULL, "name" nvarchar(30) NOT NULL, "shname" nvarchar(10) NOT NULL, CONSTRAINT "PK_0a0452e2e73089051f5b480207c" PRIMARY KEY ("materialtype"))`);
        await queryRunner.query(`CREATE TABLE "proc_materials" ("material" int NOT NULL IDENTITY(1,1), "code" nvarchar(30) NOT NULL, "name" nvarchar(30) NOT NULL, "active" bit NOT NULL CONSTRAINT "DF_28aa33dd7f5aad4566f79c6d764" DEFAULT 0, "expire1" int, "systemtype" int NOT NULL, "materialtype" int, "pkpackaging" int, "itpackaging" int, "expire1method" int, CONSTRAINT "PK_60b915de6f4a706bbb3e4607c7f" PRIMARY KEY ("material"))`);
        await queryRunner.query(`CREATE TABLE "proc_materialc" ("id" int NOT NULL IDENTITY(1,1), "active" bit NOT NULL, "description1" nvarchar(80), "expire1" int, "packsizeum" smallint, "stacksizeum" smallint, "palletpsizeum" smallint, "palletssizeum" smallint, "material" int, "customer" int, "packaging" int, "pkpackaging" int, "itpackaging" int, "itlayout" int, "pklayout" int, "expire1method" int, CONSTRAINT "PK_a881df7b5448d04863e40dfdf6a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "proc_unitmaterialc" ("id" int NOT NULL IDENTITY(1,1), "unitid" int NOT NULL, "unittype" smallint NOT NULL, "materialc" int, CONSTRAINT "PK_4f73a6424b06edd6b5d1b0691a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Menu" ("id" int NOT NULL IDENTITY(1,1), "visible" bit NOT NULL, "path" varchar(1024), "icon" varchar(128) NOT NULL, "name" varchar(512) NOT NULL, "mpath" nvarchar(255) CONSTRAINT "DF_ce23145c2ec228a128ffb3c28db" DEFAULT '', "parentId" int, CONSTRAINT "PK_b2683c330c5e6d700266a6f46d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "proc_orderl" ADD CONSTRAINT "FK_35cdc61ccb48c9667b17bcf17f1" FOREIGN KEY ("order") REFERENCES "proc_orders"("order") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_orderl" ADD CONSTRAINT "FK_be6264aba1fe75bfa60f8c5b3ef" FOREIGN KEY ("material") REFERENCES "proc_materials"("material") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_orderl" ADD CONSTRAINT "FK_635ad3b436ba4bfc62bf06fef03" FOREIGN KEY ("itlayout") REFERENCES "proc_layouts"("layout") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_orderl" ADD CONSTRAINT "FK_c4c0547b2e9968f55b6d24cad61" FOREIGN KEY ("pklayout") REFERENCES "proc_layouts"("layout") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_orderl" ADD CONSTRAINT "FK_d6058f2db86ac00bd944dd1e774" FOREIGN KEY ("expire1method") REFERENCES "proc_expiremethods"("expiremethod") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_orderl" ADD CONSTRAINT "FK_c695eb6bcdaa5b8f2a48a762d16" FOREIGN KEY ("pkpackaging") REFERENCES "proc_materials"("material") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_orderl" ADD CONSTRAINT "FK_d7d0f37f984072cb7c0599fd64c" FOREIGN KEY ("itpackaging") REFERENCES "proc_materials"("material") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_packs" ADD CONSTRAINT "FK_7d6dba0f02f473cf0b270347377" FOREIGN KEY ("lot") REFERENCES "proc_lots"("lot") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_items" ADD CONSTRAINT "FK_d19aaafd12e6867382be3a2ff3e" FOREIGN KEY ("order") REFERENCES "proc_orders"("order") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_items" ADD CONSTRAINT "FK_1e573785ec633b2002b31663614" FOREIGN KEY ("lot") REFERENCES "proc_lots"("lot") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_items" ADD CONSTRAINT "FK_ce7151b88cf494765bcc727a2db" FOREIGN KEY ("material") REFERENCES "proc_materials"("material") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_orders" ADD CONSTRAINT "FK_ea67cc09003fcdd3c33ed2a58cf" FOREIGN KEY ("customer") REFERENCES "base_companies"("company") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_collections" ADD CONSTRAINT "FK_835b3c0a7518e9d2a573f26ac82" FOREIGN KEY ("order") REFERENCES "proc_orders"("order") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_collections" ADD CONSTRAINT "FK_23751c09f632a3692b559124da5" FOREIGN KEY ("lot") REFERENCES "proc_lots"("lot") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_collections" ADD CONSTRAINT "FK_b28f81f0bac4c360da4adb1596a" FOREIGN KEY ("material") REFERENCES "proc_materials"("material") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_materials" ADD CONSTRAINT "FK_67ff99ee5e37a8d2a0cad99252a" FOREIGN KEY ("materialtype") REFERENCES "proc_materialtypes"("materialtype") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_materials" ADD CONSTRAINT "FK_83622d06b8b76b55a9c0d4130c8" FOREIGN KEY ("pkpackaging") REFERENCES "proc_materials"("material") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_materials" ADD CONSTRAINT "FK_7d82f5e9e69f348855248a3dc1f" FOREIGN KEY ("itpackaging") REFERENCES "proc_materials"("material") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_materials" ADD CONSTRAINT "FK_21fdc515bd31ed4d288dc2a46ff" FOREIGN KEY ("expire1method") REFERENCES "proc_expiremethods"("expiremethod") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_materialc" ADD CONSTRAINT "FK_e12e2d75ffeadc1cada3a33fbde" FOREIGN KEY ("material") REFERENCES "proc_materials"("material") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_materialc" ADD CONSTRAINT "FK_b170a511793de751f7a96079735" FOREIGN KEY ("customer") REFERENCES "base_companies"("company") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_materialc" ADD CONSTRAINT "FK_0e273613fa2d2cb88fd887c2b26" FOREIGN KEY ("packaging") REFERENCES "proc_materials"("material") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_materialc" ADD CONSTRAINT "FK_fe436486c87dbffcc0ba3d89335" FOREIGN KEY ("pkpackaging") REFERENCES "proc_materials"("material") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_materialc" ADD CONSTRAINT "FK_7219d556470a2abd67d981f8332" FOREIGN KEY ("itpackaging") REFERENCES "proc_materials"("material") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_materialc" ADD CONSTRAINT "FK_3c092e473a7f2fb883502ea1bcf" FOREIGN KEY ("itlayout") REFERENCES "proc_layouts"("layout") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_materialc" ADD CONSTRAINT "FK_22d40d383fb7ebb554d193b9b3c" FOREIGN KEY ("pklayout") REFERENCES "proc_layouts"("layout") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_materialc" ADD CONSTRAINT "FK_3f21cf4aeff1df14f37089faab3" FOREIGN KEY ("expire1method") REFERENCES "proc_expiremethods"("expiremethod") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proc_unitmaterialc" ADD CONSTRAINT "FK_e90f94f652c609d75ca664bdf62" FOREIGN KEY ("materialc") REFERENCES "proc_materialc"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Menu" ADD CONSTRAINT "FK_c4c5fa3bc158c089f076ec35d08" FOREIGN KEY ("parentId") REFERENCES "Menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Menu" DROP CONSTRAINT "FK_c4c5fa3bc158c089f076ec35d08"`);
        await queryRunner.query(`ALTER TABLE "proc_unitmaterialc" DROP CONSTRAINT "FK_e90f94f652c609d75ca664bdf62"`);
        await queryRunner.query(`ALTER TABLE "proc_materialc" DROP CONSTRAINT "FK_3f21cf4aeff1df14f37089faab3"`);
        await queryRunner.query(`ALTER TABLE "proc_materialc" DROP CONSTRAINT "FK_22d40d383fb7ebb554d193b9b3c"`);
        await queryRunner.query(`ALTER TABLE "proc_materialc" DROP CONSTRAINT "FK_3c092e473a7f2fb883502ea1bcf"`);
        await queryRunner.query(`ALTER TABLE "proc_materialc" DROP CONSTRAINT "FK_7219d556470a2abd67d981f8332"`);
        await queryRunner.query(`ALTER TABLE "proc_materialc" DROP CONSTRAINT "FK_fe436486c87dbffcc0ba3d89335"`);
        await queryRunner.query(`ALTER TABLE "proc_materialc" DROP CONSTRAINT "FK_0e273613fa2d2cb88fd887c2b26"`);
        await queryRunner.query(`ALTER TABLE "proc_materialc" DROP CONSTRAINT "FK_b170a511793de751f7a96079735"`);
        await queryRunner.query(`ALTER TABLE "proc_materialc" DROP CONSTRAINT "FK_e12e2d75ffeadc1cada3a33fbde"`);
        await queryRunner.query(`ALTER TABLE "proc_materials" DROP CONSTRAINT "FK_21fdc515bd31ed4d288dc2a46ff"`);
        await queryRunner.query(`ALTER TABLE "proc_materials" DROP CONSTRAINT "FK_7d82f5e9e69f348855248a3dc1f"`);
        await queryRunner.query(`ALTER TABLE "proc_materials" DROP CONSTRAINT "FK_83622d06b8b76b55a9c0d4130c8"`);
        await queryRunner.query(`ALTER TABLE "proc_materials" DROP CONSTRAINT "FK_67ff99ee5e37a8d2a0cad99252a"`);
        await queryRunner.query(`ALTER TABLE "proc_collections" DROP CONSTRAINT "FK_b28f81f0bac4c360da4adb1596a"`);
        await queryRunner.query(`ALTER TABLE "proc_collections" DROP CONSTRAINT "FK_23751c09f632a3692b559124da5"`);
        await queryRunner.query(`ALTER TABLE "proc_collections" DROP CONSTRAINT "FK_835b3c0a7518e9d2a573f26ac82"`);
        await queryRunner.query(`ALTER TABLE "proc_orders" DROP CONSTRAINT "FK_ea67cc09003fcdd3c33ed2a58cf"`);
        await queryRunner.query(`ALTER TABLE "proc_items" DROP CONSTRAINT "FK_ce7151b88cf494765bcc727a2db"`);
        await queryRunner.query(`ALTER TABLE "proc_items" DROP CONSTRAINT "FK_1e573785ec633b2002b31663614"`);
        await queryRunner.query(`ALTER TABLE "proc_items" DROP CONSTRAINT "FK_d19aaafd12e6867382be3a2ff3e"`);
        await queryRunner.query(`ALTER TABLE "proc_packs" DROP CONSTRAINT "FK_7d6dba0f02f473cf0b270347377"`);
        await queryRunner.query(`ALTER TABLE "proc_orderl" DROP CONSTRAINT "FK_d7d0f37f984072cb7c0599fd64c"`);
        await queryRunner.query(`ALTER TABLE "proc_orderl" DROP CONSTRAINT "FK_c695eb6bcdaa5b8f2a48a762d16"`);
        await queryRunner.query(`ALTER TABLE "proc_orderl" DROP CONSTRAINT "FK_d6058f2db86ac00bd944dd1e774"`);
        await queryRunner.query(`ALTER TABLE "proc_orderl" DROP CONSTRAINT "FK_c4c0547b2e9968f55b6d24cad61"`);
        await queryRunner.query(`ALTER TABLE "proc_orderl" DROP CONSTRAINT "FK_635ad3b436ba4bfc62bf06fef03"`);
        await queryRunner.query(`ALTER TABLE "proc_orderl" DROP CONSTRAINT "FK_be6264aba1fe75bfa60f8c5b3ef"`);
        await queryRunner.query(`ALTER TABLE "proc_orderl" DROP CONSTRAINT "FK_35cdc61ccb48c9667b17bcf17f1"`);
        await queryRunner.query(`DROP TABLE "Menu"`);
        await queryRunner.query(`DROP TABLE "proc_unitmaterialc"`);
        await queryRunner.query(`DROP TABLE "proc_materialc"`);
        await queryRunner.query(`DROP TABLE "proc_materials"`);
        await queryRunner.query(`DROP TABLE "proc_materialtypes"`);
        await queryRunner.query(`DROP TABLE "proc_collections"`);
        await queryRunner.query(`DROP TABLE "proc_orders"`);
        await queryRunner.query(`DROP TABLE "proc_items"`);
        await queryRunner.query(`DROP TABLE "proc_lots"`);
        await queryRunner.query(`DROP TABLE "proc_packs"`);
        await queryRunner.query(`DROP TABLE "proc_orderl"`);
        await queryRunner.query(`DROP TABLE "proc_layouts"`);
        await queryRunner.query(`DROP TABLE "proc_expiremethods"`);
        await queryRunner.query(`DROP TABLE "base_companies"`);
    }

}
