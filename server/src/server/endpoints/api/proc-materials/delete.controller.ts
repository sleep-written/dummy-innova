import { Controller, ControllerPath, Delete } from '@bleed-believer/espresso';

import { ProcMaterials } from '@/orm-innova/entities/proc-materials.entity.js';
import { EndpointError } from '@server/endpoint-error.js';

@ControllerPath('')
export class DeleteController extends Controller {
    @Delete(':id')
    async delete(): Promise<void> {
        const id = typeof this.request.params.id === 'string'
        ?   parseInt(this.request.params.id)
        :   NaN;

        if (isNaN(id)) {
            throw new EndpointError(400, 'Invalid material "id"');
        }

        const material = await ProcMaterials.findOne({
            select: {
                id: true,
                procOrderL: { id: true },
                procOrderLPkPackaging: { id: true },
                procOrderLItPackaging: { id: true },
                procItems: { id: true },
                procCollections: { id: true },
            },
            relations: {
                procOrderL: true,
                procOrderLPkPackaging: true,
                procOrderLItPackaging: true,
                procItems: true,
                procCollections: true,
            },
            where: { id }
        });

        if (!material) {
            throw new EndpointError(404, 'Material not found');
        }

        const usedBy = [
            ...(material.procOrderL ?? []),
            ...(material.procOrderLPkPackaging ?? []),
            ...(material.procOrderLItPackaging ?? []),
            ...(material.procItems ?? []),
            ...(material.procCollections ?? []),
        ];

        if (usedBy.length > 0) {
            throw new EndpointError(
                409,
                `Material cannot be removed because it is used by ${usedBy.length} record(s)`
            );
        }

        await material.remove();
        this.response.end();
    }
}
