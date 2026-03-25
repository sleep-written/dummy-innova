import { Controller, ControllerPath, Get } from '@bleed-believer/espresso';
import { ODataQuery } from '@bleed-believer/kendo-grid-server';

import { ProcMaterials } from '@/orm-innova/entities/proc-materials.entity.js';
import { BaseCompanies } from '@/orm-innova/entities/base-companies.entity.js';
import { EndpointError } from '@server/endpoint-error.js';

interface GridView {
    data: (BaseCompanies & { setled: boolean })[];
    total: number;
}

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

    async #getMaterial(): Promise<ProcMaterials> {
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

        return material;
    }

    async #getCustomers(): Promise<GridView> {
        const query = BaseCompanies
            .createQueryBuilder('BaseCompanies')
            .leftJoin(
                'BaseCompanies.materialc', 'ProcMaterialc',
                'ProcMaterialc.material = :material',
                { material: this.id }
            )
            .leftJoin('ProcMaterialc.packaging', 'Packaging')
            .leftJoin('ProcMaterialc.pkPackaging', 'PkPackaging')
            .leftJoin('ProcMaterialc.itPackaging', 'ItPackaging')
            .leftJoin('ProcMaterialc.procLayoutIT', 'ProcLayoutIT')
            .leftJoin('ProcMaterialc.procLayoutPK', 'ProcLayoutPK')
            .leftJoin('ProcMaterialc.expire1method', 'Expire1method')
            .select([
                'BaseCompanies.id               AS id',
                'BaseCompanies.active           AS active',
                'BaseCompanies.code             AS code',
                'BaseCompanies.name             AS name',
                'BaseCompanies.description8     AS description8',
                `--sql
                IIF(
                    ProcMaterialc.id IS NOT NULL,
                    CAST(1 AS BIT),
                    CAST(0 AS BIT)
                ) AS setled`,
                'ProcMaterialc.id               AS procMaterialcId',
                'ProcMaterialc.active           AS procMaterialcActive',
                'ProcMaterialc.description1     AS procMaterialcDescription1',
                'ProcMaterialc.expire1          AS procMaterialcExpire1',
                'ProcMaterialc.packsizeum       AS procMaterialcPacksizeum',
                'ProcMaterialc.stacksizeum      AS procMaterialcStacksizeum',
                'ProcMaterialc.palletpsizeum    AS procMaterialcPalletpsizeum',
                'ProcMaterialc.palletssizeum    AS procMaterialcPalletssizeum',
                'Packaging.id                   AS packagingId',
                'Packaging.code                 AS packagingCode',
                'Packaging.name                 AS packagingName',
                'PkPackaging.id                 AS pkPackagingId',
                'PkPackaging.code               AS pkPackagingCode',
                'PkPackaging.name               AS pkPackagingName',
                'ItPackaging.id                 AS itPackagingId',
                'ItPackaging.code               AS itPackagingCode',
                'ItPackaging.name               AS itPackagingName',
                'ProcLayoutIT.id                AS procLayoutITId',
                'ProcLayoutIT.code              AS procLayoutITCode',
                'ProcLayoutIT.name              AS procLayoutITName',
                'ProcLayoutPK.id                AS procLayoutPKId',
                'ProcLayoutPK.code              AS procLayoutPKCode',
                'ProcLayoutPK.name              AS procLayoutPKName',
                'Expire1method.id               AS expire1methodId',
                'Expire1method.code             AS expire1methodCode',
                'Expire1method.name             AS expire1methodName',
            ]);
        
        const odata = new ODataQuery(query, this.request);
        const customers = await odata.getRawMany<any>();
        customers.data = customers.data.map(x => {
            const materialc = !x.setled
            ?   undefined
            :   {
                    id: x.procMaterialcId,
                    active: x.procMaterialcActive,
                    description1: x.procMaterialcDescription1,
                    expire1: x.procMaterialcExpire1,
                    packsizeum: x.procMaterialcPacksizeum,
                    stacksizeum: x.procMaterialcStacksizeum,
                    palletpsizeum: x.procMaterialcPalletpsizeum,
                    palletssizeum: x.procMaterialcPalletssizeum,

                    packaging: typeof x.packagingId !== 'number'
                    ?   undefined
                    :   {
                            id:   x.packagingId,
                            code: x.packagingCode,
                            name: x.packagingName,
                        },
                    pkPackaging: typeof x.pkPackagingId !== 'number'
                    ?   undefined
                    :   {
                            id:   x.pkPackagingId,
                            code: x.pkPackagingCode,
                            name: x.pkPackagingName,
                        },
                    itPackaging: typeof x.itPackagingId !== 'number'
                    ?   undefined
                    :   {
                            id:   x.itPackagingId,
                            code: x.itPackagingCode,
                            name: x.itPackagingName,
                        },
                    procLayoutIT: typeof x.procLayoutITId !== 'number'
                    ?   undefined
                    :   {
                            Id:   x.procLayoutITId,
                            Code: x.procLayoutITCode,
                            Name: x.procLayoutITName
                        },
                    procLayoutPK: typeof x.procLayoutPKId !== 'number'
                    ?   undefined
                    :   {
                            id:   x.procLayoutPKId,
                            code: x.procLayoutPKCode,
                            name: x.procLayoutPKName
                        },
                    expire1method: typeof x.expire1methodId !== 'number'
                    ?   undefined
                    :   {
                            id:   x.expire1methodId,
                            code: x.expire1methodCode,
                            name: x.expire1methodName
                        }
                };

            return {
                id: x.id,
                active: x.active,
                code: x.code,
                name: x.name,
                description8: x.description8,
                setled: x.setled,
                materialc
            }
        });

        return customers;
    }

    @Get()
    async get(): Promise<void> {
        const [ material, customers ] = await Promise.all([
            this.#getMaterial(),
            this.#getCustomers()
        ]);

        this.response.json({ material, customers });
    }
}