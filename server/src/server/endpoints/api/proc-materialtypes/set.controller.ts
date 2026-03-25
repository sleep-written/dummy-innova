import { Controller, ControllerPath, Post } from '@bleed-believer/espresso';
import { Auditor } from 'audit-var';

import { ProcMaterialtypes } from '@/orm-innova/entities/proc-materialtypes.entity.js';

@ControllerPath('')
export class SetController extends Controller {
    #auditor = new Auditor({
        type: 'object',
        keys: {
            code:   { type: 'string', max: 30 },
            name:   { type: 'string', max: 30 },
            shname: { type: 'string', max: 10 },
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
        const item = typeof id === 'number'
        ?   await ProcMaterialtypes.findOneByOrFail({ id })
        :   new ProcMaterialtypes();

        item.code = body.code;
        item.name = body.name;
        item.shname = body.shname;
        await item.save();

        this.response.end();
    }
}
