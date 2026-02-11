import { ControllerRouting } from '@bleed-believer/espresso';

import { SetController } from './set.controller.js';

@ControllerRouting({
    path: 'base-companies',
    controllers: [
        SetController,
    ]
})
export class BaseCompaniesRouting {}