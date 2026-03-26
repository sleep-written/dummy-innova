import { ControllerRouting } from '@bleed-believer/espresso';

import { GetController } from './get.controller.js';

@ControllerRouting({
    path: 'proc-orderl',
    controllers: [
        GetController,
    ]
})
export class ProcOrderlRouting {}
