import type { MigrationInterface, QueryRunner } from "typeorm";
import { ExpireMethod } from '@entities/expire-method.entity.js';

export class InsertExpireMethods1770737692875 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const repo = queryRunner.connection.getRepository(ExpireMethod);
        await repo.save({ id:  1, active: true, code: 'prex0001', name: `Days from production day` });
        await repo.save({ id:  2, active: true, code: 'prex0002', name: `Days from registration time` });
        await repo.save({ id:  3, active: true, code: 'prex0003', name: `Days from PO first day` });
        await repo.save({ id:  4, active: true, code: 'prex0004', name: `Days from PO last day` });
        await repo.save({ id:  5, active: true, code: 'prex0005', name: `Days from PO delivery` });
        await repo.save({ id:  6, active: true, code: 'prex0006', name: `Days from PO catch day` });
        await repo.save({ id:  7, active: true, code: 'prex0007', name: `Days from order PO first day` });
        await repo.save({ id:  8, active: true, code: 'prex0008', name: `Days from order PO last day` });
        await repo.save({ id:  9, active: true, code: 'prex0009', name: `Days from order PO delivery` });
        await repo.save({ id: 10, active: true, code: 'prex0010', name: `Days from order PO catch day` });
        await repo.save({ id: 11, active: true, code: 'prex0011', name: `Months from production day` });
        await repo.save({ id: 12, active: true, code: 'prex0012', name: `Months from registration time` });
        await repo.save({ id: 13, active: true, code: 'prex0013', name: `Months from PO first day` });
        await repo.save({ id: 14, active: true, code: 'prex0014', name: `Months from PO last day` });
        await repo.save({ id: 15, active: true, code: 'prex0015', name: `Months from PO delivery` });
        await repo.save({ id: 16, active: true, code: 'prex0016', name: `Months from PO catch day` });
        await repo.save({ id: 17, active: true, code: 'prex0017', name: `Months from order PO first day` });
        await repo.save({ id: 18, active: true, code: 'prex0018', name: `Months from order PO last day` });
        await repo.save({ id: 19, active: true, code: 'prex0019', name: `Months from order PO delivery` });
        await repo.save({ id: 20, active: true, code: 'prex0020', name: `Months from order PO catch day` });
        await repo.save({ id: 21, active: true, code: 'prex0021', name: `Hours from registration time` });
        await repo.save({ id: 22, active: true, code: 'prex0022', name: `Hours from PO delivery` });
        await repo.save({ id: 23, active: true, code: 'prex0023', name: `Hours from order PO delivery` });
        await repo.save({ id: 24, active: true, code: 'prex0024', name: `Days from lot's slaughter day` });
        await repo.save({ id: 25, active: true, code: 'prex0025', name: `Months from lot's slaughter d.` });
        await repo.save({ id: 26, active: true, code: 'prex0026', name: `Hours from inventory time` });
        await repo.save({ id: 27, active: true, code: 'prex0027', name: `Days from inventory time` });
        await repo.save({ id: 28, active: true, code: 'prex0028', name: `Months from inventory time` });
        await repo.save({ id: 30, active: true, code: 'prex0030', name: `Days from Infividuals Slday` });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const repo = queryRunner.connection.getRepository(ExpireMethod);
        await repo.deleteAll();
    }
}
