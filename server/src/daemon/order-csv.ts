import type { OrderCSVInject } from './order-csv.inject.js';
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
    #injected: Required<OrderCSVInject>;

    constructor(inject?: OrderCSVInject) {
        this.#injected = {
            readFile:   inject?.readFile?.bind(inject)  ?? readFile,
            manager:    inject?.manager                 ?? ormInnovaDataSource.manager
        };
    }

    async load(path: string): Promise<ProcOrders> {
        const txt = await this.#injected.readFile(path, 'utf-16le');
        const raw = csv.parse(txt, { autoParse: false, delimiter: ';' });
        const obj = new ProcOrders();

        // El header se repite en todas las filas
        const [ code, customerCode, countryISO, , begtime,,,,,,,, extOC,,,,,, ShMark ] = raw[0];

        obj.code = code;
        obj.customer = await this.#injected.manager.findOneBy(
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
        obj.ordertype = 666;
        obj.accepttype = 666;
        obj.orderstatus = ProcOrdersStatus.OnHold;
        obj.numbermethod = 666;
        obj.transferstatus = 666;

        obj.name = code;
        obj.code = code;
        obj.shname = code;
        obj.shMark = ShMark;
        obj.active = true;
        obj.extcode = extOC;
        obj.begTime = dateFns.parse(begtime, 'yyyyMMdd', new Date());
        obj.countryISO = countryISO;
        await this.#injected.manager.save(obj);

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
            item.procMaterials = await this.#injected.manager
                .findOneByOrFail(ProcMaterials, { code: productoCodA })
                .catch(() => { throw new Error('Material not found'); })

            item.expire1 = null;
            item.expire1method = await this.#injected.manager
                .findOneBy(ProcExpireMethod, { id: 1 });

            await this.#injected.manager.save(item);
            item.procOrders = undefined;
            details.push(item);
        }

        obj.procOrderL = details;
        return obj;
    };
}