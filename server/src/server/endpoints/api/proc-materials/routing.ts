import { ControllerRouting } from '@bleed-believer/espresso';

import { DeleteController } from './delete.controller.js';
import { GetController } from './get.controller.js';

@ControllerRouting({
    path: 'proc-materials',
    controllers: [
        DeleteController,
        GetController,
    ]
})
export class ProcMaterialsRouting {}
