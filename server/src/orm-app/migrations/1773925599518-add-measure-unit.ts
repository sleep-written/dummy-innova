import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMeasureUnit1773925599518 implements MigrationInterface {
    name = 'AddMeasureUnit1773925599518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "MeasureUnit" ("id" integer PRIMARY KEY NOT NULL, "description" nvarchar(128) NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "MeasureUnit"`);
    }
}
