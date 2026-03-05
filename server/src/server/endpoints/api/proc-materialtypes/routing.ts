import { ControllerRouting } from '@bleed-believer/espresso';

import { GetController } from './get.controller.js';

@ControllerRouting({
    path: 'proc-materialtypes',
    controllers: [
        GetController
    ]
})
export class ProcMaterialtypesRouting {}