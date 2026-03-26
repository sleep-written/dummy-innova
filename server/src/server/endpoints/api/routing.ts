import { ControllerRouting } from '@bleed-believer/espresso';

import { ProcMaterialtypesRouting } from './proc-materialtypes/routing.js';
import { BaseCompaniesRouting } from './base-companies/routing.js';
import { ProcMaterialcRouting } from './proc-materialc/routing.js';
import { ProcMaterialsRouting } from './proc-materials/routing.js';
import { ProcOrdersRouting } from './proc-orders/routing.js';
import { ProcOrderlRouting } from './proc-orderl/routing.js';
import { ProcLayoutsRouting } from './proc-layouts/routing.js';
import { LocaleRouting } from './locale/routing.js';
import { MenuRouting } from './menu/routing.js';

import { ProcExpiremethodsController } from './proc-expiremethods.controller.js';
import { SystemtypeController } from './systemtype.controller.js';

@ControllerRouting({
    path: 'api',
    routes: [
        ProcMaterialtypesRouting,
        BaseCompaniesRouting,
        ProcMaterialcRouting,
        ProcMaterialsRouting,
        ProcOrdersRouting,
        ProcOrderlRouting,
        ProcLayoutsRouting,
        LocaleRouting,
        MenuRouting,
    ],
    controllers: [
        ProcExpiremethodsController,
        SystemtypeController
    ]
})
export class APIRouting {}