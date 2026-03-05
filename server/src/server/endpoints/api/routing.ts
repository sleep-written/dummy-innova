import { ControllerRouting } from '@bleed-believer/espresso';

import { ProcMaterialtypesRouting } from './proc-materialtypes/routing.js';
import { BaseCompaniesRouting } from './base-companies/routing.js';
import { ProcMaterialsRouting } from './proc-materials/routing.js';
import { ProcLayoutsRouting } from './proc-layouts/routing.js';
import { LocaleRouting } from './locale/routing.js';
import { MenuRouting } from './menu/routing.js';

import { SystemtypeController } from './systemtype.controller.js';

@ControllerRouting({
    path: 'api',
    routes: [
        ProcMaterialtypesRouting,
        BaseCompaniesRouting,
        ProcMaterialsRouting,
        ProcLayoutsRouting,
        LocaleRouting,
        MenuRouting,
    ],
    controllers: [
        SystemtypeController
    ]
})
export class APIRouting {}