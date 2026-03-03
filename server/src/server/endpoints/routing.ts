import { ControllerRouting } from '@bleed-believer/espresso';

import { APIRouting } from './api/routing.js';
import { ClientController } from './client.controller.js';

@ControllerRouting({
    routes: [
        APIRouting
    ],
    controllers: [
        ClientController
    ]
})
export class EndpointsRouting {}