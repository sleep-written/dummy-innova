import { ControllerRouting } from '@bleed-believer/espresso';

import { GetController } from './get.controller.js';

@ControllerRouting({
    path: 'proc-materialc',
    controllers: [
        GetController,
    ]
})
export class ProcMaterialcRouting {}