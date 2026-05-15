import type { OrderCSVInject } from './order-csv.inject.js';
import type { EntityManager } from 'typeorm';
import { readFile } from 'node:fs/promises';
import * as dateFns from 'date-fns';
import * as csv from 'csv-parse/sync';

import { ormInnovaDataSource } from '@orm-innova/data-source.js';
import { ProcExpireMethod } from '@orm-innova/entities/proc-expire-method.entity.js';
import { ProcOrderLStatus } from '@orm-innova/entities/proc-orderl-status.js';
import { ProcOrdersStatus } from '@orm-innova/entities/proc-orders-status.js';
import { BaseCompanies } from '@orm-innova/entities/base-companies.entity.js';
import { ProcMaterials } from '@orm-innova/entities/proc-materials.entity.js';
import { ProcOrders } from '@orm-innova/entities/proc-orders.entity.js';
import { ProcOrderL } from '@orm-innova/entities/proc-orderl.entity.js';

export class OrderCSV {
    async parse(text: string, manager?: EntityManager): Promise<ProcOrders> {
        if (!manager) {
            manager = ormInnovaDataSource.manager;
        }

        const raw = csv.parse(text, { autoParse: false, delimiter: ';' });
        const obj = new ProcOrders();

        // El header se repite en todas las filas
        const [ code, customerCode, countryISO, , begtime,,,,,,,, extOC,,,,,, ShMark ] = raw[0];

        obj.code = code;
        obj.customer = await manager.findOneBy(
            BaseCompanies,
            { code: customerCode }
        );

        if (!obj.customer) {
            throw new Error(`Customer not found`);
        } 

        obj.created = new Date();
        obj.modified = new Date();
        obj.allowadd = true;
        obj.amountum = 666;
        obj.ordertype = 1;
        obj.accepttype = 1;
        obj.orderstatus = ProcOrdersStatus.OnHold;
        obj.numbermethod = 1;
        obj.transferstatus = 1;

        obj.name = code;
        obj.code = code;
        obj.shname = code;
        obj.shMark = ShMark;
        obj.active = true;
        obj.extcode = extOC;
        obj.begTime = dateFns.parse(begtime, 'yyyyMMdd', new Date());
        obj.countryISO = countryISO;
        await manager.save(obj);

        const details: ProcOrderL[] = [];
        for (const row of raw) {
            if (row.length === 0) {
                continue;
            }

            const [ ,,,,,productoCodA,,productDescription, maxAmount ] = row;
            const item = new ProcOrderL();

            // Placeholder values
            item.olstatus = ProcOrderLStatus.OnHold;
            item.palletssizeum = 666;
            item.palletpsizeum = 666;
            item.stacksizeum = 666;
            item.packsizeum = 666;
            item.assigntype = 666;
            item.planstatus = 666;
            item.unittype = 666;
            item.amountum = 666;
            item.allowchange = false;
            item.isupdated = false;
            item.nolimit = false;
            item.useco = false;

            item.descript = productDescription;
            item.procOrders = obj;
            item.curamount = 0;
            item.maxamount = parseInt(maxAmount);
            item.procMaterials = await manager
                .findOneByOrFail(ProcMaterials, { code: productoCodA })
                .catch(() => { throw new Error('Material not found'); })

            item.expire1 = null;
            item.expire1method = await manager
                .findOneBy(ProcExpireMethod, { id: 1 });

            await manager.save(item);
            item.procOrders = undefined;
            details.push(item);
        }

        obj.procOrderL = details;
        return obj;
    };
}