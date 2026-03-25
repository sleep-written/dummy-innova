import { Controller, ControllerPath, Delete } from '@bleed-believer/espresso';
import { ProcLayouts } from '@/orm-innova/entities/proc-layouts.entity.js';
import { EndpointError } from '@server/endpoint-error.js';

@ControllerPath('')
export class DeleteController extends Controller {
    @Delete(':id')
    async delete(): Promise<void> {
        const id = typeof this.request.params.id === 'string'
        ?   parseInt(this.request.params.id)
        :   NaN;

        if (isNaN(id)) {
            throw new EndpointError(400, 'Invalid layout "id"');
        }

        const layout = await ProcLayouts.findOne({
            select: {
                id: true,
                orderDetailsIT: { id: true },
                orderDetailsPK: { id: true },
            },
            relations: {
                orderDetailsIT: true,
                orderDetailsPK: true,
            },
            where: { id }
        });

        if (!layout) {
            throw new EndpointError(404, 'Layout not found');
        }

        const usedBy = [
            ...(layout.orderDetailsIT ?? []),
            ...(layout.orderDetailsPK ?? []),
        ];

        if (usedBy.length > 0) {
            throw new EndpointError(
                409,
                `Layout cannot be removed because it is used by ${usedBy.length} order detail(s)`
            );
        }

        await layout.remove();
        this.response.end();
    }
}
