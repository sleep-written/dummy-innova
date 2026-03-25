import { Controller, ControllerPath, Delete } from '@bleed-believer/espresso';

import { ProcMaterialtypes } from '@/orm-innova/entities/proc-materialtypes.entity.js';
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
            throw new EndpointError(400, 'Invalid material type "id"');
        }

        const materialtype = await ProcMaterialtypes.findOne({
            where: { id }
        });

        if (!materialtype) {
            throw new EndpointError(404, 'Material type not found');
        }

        const usedCount = await ProcMaterials.count({
            where: { materialtype: { id } }
        });

        if (usedCount > 0) {
            throw new EndpointError(
                409,
                `Material type cannot be removed because it is used by ${usedCount} material(s)`
            );
        }

        await materialtype.remove();
        this.response.end();
    }
}
