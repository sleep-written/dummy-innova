import { Controller, ControllerPath, Get } from '@bleed-believer/espresso';
import { ODataEntity } from '@bleed-believer/kendo-grid-server';

import { ProcOrders } from '@/orm-innova/entities/proc-orders.entity.js';
import { ormInnovaDataSource } from '@/orm-innova/data-source.js';

@ControllerPath('')
export class GetController extends Controller {
    @Get()
    async get(): Promise<void> {
        const odata = new ODataEntity(ProcOrders, ormInnovaDataSource, this.request);
        const result = await odata.getMany({
            relations: {
                customer: true
            }
        });
        this.response.json(result);
    }
}
