import { Controller, ControllerPath, Post } from '@bleed-believer/espresso';
import { Auditor } from 'audit-var';

import { ProcLayouts } from '@entities/proc-layouts.entity.js';

@ControllerPath('')
export class SetController extends Controller {
    #auditor = new Auditor({
        type: 'object',
        keys: {
            code:   { type: 'string',  max: 30 },
            name:   { type: 'string',  max: 30 },
            active: { type: 'boolean', optional: true },
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
        ?   await ProcLayouts.findOneByOrFail({ id })
        :   new ProcLayouts();

        item.active = body.active ?? true;
        item.code = body.code;
        item.name = body.name;
        await item.save();

        this.response.end();
    }
}
