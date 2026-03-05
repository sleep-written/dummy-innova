import { ControllerRouting } from '@bleed-believer/espresso';

import { GetController } from './get.controller.js';

@ControllerRouting({
    path: 'locale',
    controllers: [
        GetController
    ]
})
export class LocaleRouting {}