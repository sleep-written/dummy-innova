import { Controller, ControllerPath, Get } from '@bleed-believer/espresso';
import { ODataEntity } from '@bleed-believer/kendo-grid-server';

import { ProcMaterialc } from '@entities/proc-materialc.entity.js';
import { ProcMaterials } from '@entities/proc-materials.entity.js';
import { EndpointError } from '@server/endpoint-error.js';
import { dataSource } from '@/data-source.js';

@ControllerPath(':id')
export class GetController extends Controller {
    get id(): number {
        const id = typeof this.request.params.id === 'string'
        ?   parseInt(this.request.params.id)
        :   NaN;

        if (isNaN(id)) {
            throw new EndpointError(400, 'The product "id" is invalid');
        }

        return id;
    }

    @Get('settings')
    async getDetails(): Promise<void> {
        const odata = new ODataEntity(ProcMaterialc, dataSource, this.request);
        const data = await odata.getMany({
            where: { id: this.id },
            relations: {
                units: true,
                customer: true,
                packaging: true,
                pkPackaging: true,
                itPackaging: true,
                procLayoutPK: true,
                procLayoutIT: true,
                expire1method: true,
            }
        });

        this.response.json(data);
    }

    @Get()
    async get(): Promise<void> {
        const material = await ProcMaterials.findOne({
            where: { id: this.id },
            select: {
                id: true,
                code: true,
                name: true
            }
        });

        if (!material) {
            throw new EndpointError(404, `The product requested doesn't exists`);
        }

        this.response.json(material);
    }
}