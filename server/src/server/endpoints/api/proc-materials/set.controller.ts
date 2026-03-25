import { Controller, ControllerPath, Post } from '@bleed-believer/espresso';
import { Auditor } from 'audit-var';

import { ProcMaterialtypes } from '@/orm-innova/entities/proc-materialtypes.entity.js';
import { ProcMaterials } from '@/orm-innova/entities/proc-materials.entity.js';
import { ormInnovaDataSource } from '@/orm-innova/data-source.js';

@ControllerPath('')
export class SetController extends Controller {
    #auditor = new Auditor({
        type: 'object',
        keys: {
            code:           { type: 'string',  max: 30 },
            name:           { type: 'string',  max: 30 },
            active:         { type: 'boolean', optional: true },
            systemtype:     { type: 'number' },
            materialtypeId: { type: 'number',  optional: true },
            pkPackagingId:  { type: 'number',  optional: true },
            itPackagingId:  { type: 'number',  optional: true },
        }
    });

    @Post(':id')
    setById(): Promise<void> {
        const id = parseInt(this.request.params.id.toString());
        return this.set(id);
    }

    @Post()
    async set(id?: number): Promise<void> {
        const body = this.#auditor.audit(this.request.body);
        await ormInnovaDataSource.transaction('SERIALIZABLE', async manager => {
            const item = typeof id === 'number'
            ?   await manager.findOneByOrFail(ProcMaterials, { id })
            :   new ProcMaterials();

            item.code = body.code;
            item.name = body.name;
            item.active = body.active ?? false;
            item.systemtype = body.systemtype;
            
            item.materialtype = typeof body.materialtypeId === 'number'
            ?   await manager.findOneByOrFail(ProcMaterialtypes, { id: body.materialtypeId })
            :   null;

            item.pkPackaging = typeof body.pkPackagingId === 'number'
            ?   await manager.findOneByOrFail(ProcMaterials, { id: body.pkPackagingId })
            :   null;

            item.itPackaging = typeof body.itPackagingId === 'number'
            ?   await manager.findOneByOrFail(ProcMaterials, { id: body.itPackagingId })
            :   null;

            await manager.save(item);
        });

        this.response.end();
    }
}
