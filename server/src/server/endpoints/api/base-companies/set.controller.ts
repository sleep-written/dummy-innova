import { Controller, ControllerPath, Post } from '@bleed-believer/espresso';
import { Auditor } from 'audit-var';

import { BaseCompanies } from '@/orm-innova/entities/base-companies.entity.js';

@ControllerPath('')
export class SetController extends Controller {
    #auditor = new Auditor({
        type: 'object',
        keys: {
            code:           { type: 'string',  max: 30 },
            name:           { type: 'string',  max: 30 },
            active:         { type: 'boolean', optional: true },
            description8:   { type: 'string',  max: 80 }
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
        ?   await BaseCompanies.findOneByOrFail({ id })
        :   new BaseCompanies();

        item.active = true;
        item.code = body.code;
        item.name = body.name;
        item.description8 = body.description8;
        await item.save();

        this.response.end();
    }
}