import type { MigrationInterface, QueryRunner } from "typeorm";
import { ProcExpireMethod } from '@orm-innova/entities/proc-expire-method.entity.js';

export class AddExpireMethods1778684278712 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.manager.insert(ProcExpireMethod, {
            id: 1,
            code: 'prex0001',
            name: 'Days from production day',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 2,
            code: 'prex0002',
            name: 'Days from registration time',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 3,
            code: 'prex0003',
            name: 'Days from PO first day',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 4,
            code: 'prex0004',
            name: 'Days from PO last day',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 5,
            code: 'prex0005',
            name: 'Days from PO delivery',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 6,
            code: 'prex0006',
            name: 'Days from PO catch day',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 7,
            code: 'prex0007',
            name: 'Days from order PO first day',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 8,
            code: 'prex0008',
            name: 'Days from order PO last day',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 9,
            code: 'prex0009',
            name: 'Days from order PO delivery',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 10,
            code: 'prex0010',
            name: 'Days from order PO catch day',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 11,
            code: 'prex0011',
            name: 'Months from production day',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 12,
            code: 'prex0012',
            name: 'Months from registration time',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 13,
            code: 'prex0013',
            name: 'Months from PO first day',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 14,
            code: 'prex0014',
            name: 'Months from PO last day',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 15,
            code: 'prex0015',
            name: 'Months from PO delivery',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 16,
            code: 'prex0016',
            name: 'Months from PO catch day',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 17,
            code: 'prex0017',
            name: 'Months from order PO first day',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 18,
            code: 'prex0018',
            name: 'Months from order PO last day',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 19,
            code: 'prex0019',
            name: 'Months from order PO delivery',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 20,
            code: 'prex0020',
            name: 'Months from order PO catch day',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 21,
            code: 'prex0021',
            name: 'Hours from registration time',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 22,
            code: 'prex0022',
            name: 'Hours from PO delivery',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 23,
            code: 'prex0023',
            name: 'Hours from order PO delivery',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 24,
            code: 'prex0024',
            name: 'Days from lot\'s slaughter day',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 25,
            code: 'prex0025',
            name: 'Months from lot\'s slaughter d.',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 26,
            code: 'prex0026',
            name: 'Hours from inventory time',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 27,
            code: 'prex0027',
            name: 'Days from inventory time',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 28,
            code: 'prex0028',
            name: 'Months from inventory time',
            active: true
        });

        queryRunner.manager.insert(ProcExpireMethod, {
            id: 30,
            code: 'prex0030',
            name: 'Days from Infividuals Slday',
            active: true
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.manager.deleteAll(ProcExpireMethod);
    }
}
