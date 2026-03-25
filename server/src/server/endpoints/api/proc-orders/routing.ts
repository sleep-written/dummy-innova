import { ControllerRouting } from '@bleed-believer/espresso';

import { GetController } from './get.controller.js';

@ControllerRouting({
    path: 'proc-orders',
    controllers: [
        GetController,
    ]
})
export class ProcOrdersRouting {}
