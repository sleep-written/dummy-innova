import { Controller, ControllerPath, Get } from '@bleed-believer/espresso';
import { ODataQuery } from '@bleed-believer/kendo-grid-server';

import { ProcMaterials } from '@entities/proc-materials.entity.js';
import { BaseCompanies } from '@entities/base-companies.entity.js';
import { ProcMaterialc } from '@entities/proc-materialc.entity.js';
import { EndpointError } from '@server/endpoint-error.js';

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

    @Get('settings')
    async getDetails(): Promise<void> {
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
            .leftJoin('ProcMaterialc.units', 'Units')
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
                ) AS hasSettings`,
                'ProcMaterialc.id               AS procMaterialcId',
                'ProcMaterialc.active           AS procMaterialcActive',
                'ProcMaterialc.description1     AS procMaterialcDescription1',
                'ProcMaterialc.expire1          AS procMaterialcExpire1',
                'ProcMaterialc.packsizeum       AS procMaterialcPacksizeum',
                'ProcMaterialc.stacksizeum      AS procMaterialcStacksizeum',
                'ProcMaterialc.palletpsizeum    AS procMaterialcPalletpsizeum',
                'ProcMaterialc.palletssizeum    AS procMaterialcPalletssizeum',
                'Packaging.code                 AS packagingCode',
                'Packaging.name                 AS packagingName',
                'PkPackaging.code               AS pkPackagingCode',
                'PkPackaging.name               AS pkPackagingName',
                'ItPackaging.code               AS itPackagingCode',
                'ItPackaging.name               AS itPackagingName',
                'ProcLayoutIT.code              AS procLayoutITCode',
                'ProcLayoutIT.name              AS procLayoutITName',
                'ProcLayoutPK.code              AS procLayoutPKCode',
                'ProcLayoutPK.name              AS procLayoutPKName',
                'Expire1method.code             AS expire1methodCode',
                'Expire1method.name             AS expire1methodName',
                'Units.unitId                   AS unitsId',
                'Units.unitType                 AS unitsType',
            ]);
        
        const odata = new ODataQuery(query, this.request);
        const result = await odata.getRawMany();
        this.response.json(result);
    }

    @Get()
    async get(): Promise<void> {
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

        this.response.json(material);
    }
}