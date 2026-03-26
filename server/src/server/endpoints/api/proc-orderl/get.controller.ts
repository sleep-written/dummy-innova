import { Controller, ControllerPath, Get } from '@bleed-believer/espresso';
import { ODataEntity } from '@bleed-believer/kendo-grid-server';

import { ormInnovaDataSource } from '@orm-innova/data-source.js';
import { EndpointError } from '@server/endpoint-error.js';
import { ProcOrderL } from '@orm-innova/entities/proc-orderl.entity.js';
import { ProcOrders } from '@orm-innova/entities/proc-orders.entity.js';

@ControllerPath(':id')
export class GetController extends Controller {
    get id(): number {
        const id = typeof this.request.params.id === 'string'
        ?   parseInt(this.request.params.id)
        :   NaN;

        if (isNaN(id)) {
            throw new EndpointError(400, 'The order "id" is invalid');
        }

        return id;
    }

    @Get()
    async get(): Promise<void> {
        const order = await ProcOrders.findOne({
            where: { id: this.id },
            relations: {
                customer: true
            }
        });

        const odata = new ODataEntity(ProcOrderL, ormInnovaDataSource, this.request);
        const details = await odata.getMany({
            where: {
                procOrders: {
                    id: this.id }
            },
            relations: {
                pkPackaging: true,
                itPackaging: true,
                procLayoutIT: true,
                procLayoutPK: true,
                procMaterials: true,
                expire1method: true,
            }
        });

        this.response.json({ order, details });
    }
}
