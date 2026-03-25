import { Controller, ControllerPath, Delete } from '@bleed-believer/espresso';
import { BaseCompanies } from '@/orm-innova/entities/base-companies.entity.js';
import { EndpointError } from '@server/endpoint-error.js';

@ControllerPath('')
export class DeleteController extends Controller {
    @Delete(':id')
    async delete(): Promise<void> {
        const id = typeof this.request.params.id === 'string'
        ?   parseInt(this.request.params.id)
        :   NaN;

        if (isNaN(id)) {
            throw new EndpointError(400, 'Invalid company "id"');
        }

        const company = await BaseCompanies.findOne({
            select: {
                id: true,
                orders: {
                    id: true,
                    code: true
                }
            },
            relations: {
                orders: true
            },
            where: { id }
        });

        if (!company) {
            throw new EndpointError(404, 'Company not found');
        }

        if (company.orders && company.orders.length > 0) {
            const orders = company.orders
                .map(x => `"${x.code}"`)
                .join(', ');

            throw new EndpointError(
                409,
                `Company cannot be removed because is used by the orders ${orders}`
            );
        }

        await company.remove();
        this.response.end();
    }
}