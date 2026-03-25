import { Controller, ControllerPath, Get } from '@bleed-believer/espresso';
import { ODataEntity } from '@bleed-believer/kendo-grid-server';

import { ProcMaterials } from '@/orm-innova/entities/proc-materials.entity.js';
import { ormInnovaDataSource } from '@/orm-innova/data-source.js';
import { EndpointError } from '@server/endpoint-error.js';

interface Systemtype {
    name: string;
    text: string;
    value: number;
}

@ControllerPath('')
export class GetController extends Controller {
    @Get('packagings')
    async getPackagings(): Promise<void> {
        const host = this.request.protocol + '://' + this.request.host;
        const headers = new Headers()
        for (const [ key, value ] of Object.entries(this.request.headers)) {
            if (Array.isArray(value)) {
                value.forEach(x => {
                    headers.append(key, x);
                });
            } else if (typeof value === 'string') {
                headers.append(key, value);
            }
        }

        const systemtype = await fetch(`${host}/api/systemtype`, { headers })
            .then(x => x.json() as Promise<Systemtype[]>)
            .then(x => x.find(o => o.name === 'Packaging'));

        if (!systemtype) {
            throw new EndpointError(404, 'Packaging\'s system type not found');
        }

        const materials = await ProcMaterials.find({
            select: {
                id: true,
                code: true,
                name: true
            },
            where: {
                systemtype: systemtype.value
            }
        });

        this.response.json(materials);
    }

    @Get()
    async get(): Promise<void> {
        const odata = new ODataEntity(ProcMaterials, ormInnovaDataSource, this.request);
        const result = await odata.getMany({
            relations: {
                itPackaging: true,
                pkPackaging: true,
                materialtype: true
            }
        });
        this.response.json(result);
    }
}
