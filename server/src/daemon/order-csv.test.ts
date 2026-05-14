import type { OrderCSVInject } from './order-csv.inject.js';
import type { Database } from 'better-sqlite3';

import { EntityManager } from 'typeorm';
import { randomUUID } from 'node:crypto';
import { OrderCSV } from './order-csv.js';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';
import test from 'node:test';

import { AdvancedDataSource } from '@utils/typeorm';
import { ProcMaterialtypes } from '@orm-innova/entities/proc-materialtypes.entity.js';
import { ProcExpireMethod } from '@orm-innova/entities/proc-expire-method.entity.js';
import { BaseCompanies } from '@orm-innova/entities/base-companies.entity.js';
import { ProcMaterials } from '@orm-innova/entities/proc-materials.entity.js';
import { rm } from 'node:fs/promises';

const dataSource = new AdvancedDataSource({
    type: 'better-sqlite3',
    database: resolve(tmpdir(), `dummy-innova.${randomUUID()}.db`),
    entities: [
        resolve(import.meta.dirname, '../orm-innova/entities/*.entity.{ts,js}')
    ],
    migrations: [
        resolve(import.meta.dirname, '../orm-innova/migrations/*.{ts,js}')
    ],
    prepareDatabase(db: Database) {
        db.pragma('foreign_keys = ON');
    },
    prepareEntityMetadata(m) {
        m.columns
            .filter(c => c.type === 'bit')
            .forEach(c => c.type = 'boolean');
    },
});

class Inject implements OrderCSVInject {
    #files: Record<string, string[]>;

    get manager(): EntityManager {
        return dataSource.manager;
    }

    constructor(files: Record<string, string[]>) {
        this.#files = files;
    }

    async readFile(path: string, _: BufferEncoding): Promise<string> {
        if (!this.#files[path]) {
            throw new Error(`The file "${path}" doesn't exists`);
        }

        return this.#files[path].join('\n');
    }
}

test.before(async () => {
    await dataSource.initialize();
    await dataSource.synchronize();

    const manager = dataSource.manager;
    await manager.save(ProcExpireMethod, {
        code: 'AAA',
        name: 'Expire Method AAA',
        active: true
    });

    await manager.save(BaseCompanies, {
        code: '55555-K',
        name: 'El Diablo',
        active: true,
        description8: 'El diablo muaajajaja'
    });

    const materialType = await manager.save(ProcMaterialtypes, {
        code: 'BEEF',
        name: 'Carne',
        shname: 'BBBBBB'
    });

    await manager.save(ProcMaterials, {
        code: 'ÑEEEEEEE',
        name: 'Carne del universo superior',
        systemtype: 666,
        materialtype: { id: materialType.id }
    });

    await manager.save(ProcMaterials, {
        code: 'KEEEEEEK',
        name: 'Carne del universo inferior',
        systemtype: 666,
        materialtype: { id: materialType.id }
    });
});

test.after(async () => {
    await dataSource.destroy();
    if (typeof dataSource.options.database === 'string') {
        await rm(dataSource.options.database);
    }
});

test('Create contract', async (t: test.TestContext) => {
    const inject = new Inject({
        '/path/to/pendejo/666.con': [
            `666;55555-K;USA;;20260315;ÑEEEEEEE;-;UNIVERSO SUPERIOR JAJA;10000;0;H;D;CAAAAAACA;e;;;; ;12-34/26/0666`,
            `666;55555-K;USA;;20260315;KEEEEEEK;-;UNIVERSO INFERIOR JAJA;11000;0;H;T;CAAAAAACA;e;;;; ;12-34/26/0666`,
            ``
        ]
    });

    const orderCSV = new OrderCSV(inject);
    const order = await orderCSV.load('/path/to/pendejo/666.con');

    t.assert.strictEqual(typeof order.id, 'number');
    t.assert.strictEqual(order.code, '666');
    t.assert.strictEqual(order.shMark, '12-34/26/0666');
    t.assert.strictEqual(order.begTime?.getFullYear(), 2026);
    t.assert.strictEqual(order.begTime?.getMonth(), 2);
    t.assert.strictEqual(order.begTime?.getDate(), 15);
    t.assert.strictEqual(order.extcode, 'CAAAAAACA');
    t.assert.strictEqual(order.countryISO, 'USA');
    t.assert.strictEqual(order.procOrderL?.length, 2);

    // Details
    t.assert.strictEqual(order.procOrderL?.[0].maxamount, 10_000);
    t.assert.strictEqual(order.procOrderL?.[0].curamount, 0);
    t.assert.strictEqual(order.procOrderL?.[0].descript, 'UNIVERSO SUPERIOR JAJA');
    t.assert.strictEqual(order.procOrderL?.[0].procMaterials?.code, 'ÑEEEEEEE');
    
    t.assert.strictEqual(order.procOrderL?.[1].maxamount, 11_000);
    t.assert.strictEqual(order.procOrderL?.[1].curamount, 0);
    t.assert.strictEqual(order.procOrderL?.[1].descript, 'UNIVERSO INFERIOR JAJA');
    t.assert.strictEqual(order.procOrderL?.[1].procMaterials?.code, 'KEEEEEEK');
});