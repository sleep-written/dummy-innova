import { CommandRouting } from '@bleed-believer/commander';

import { DaemonCommand } from './daemon/command.js';
import { ServerCommand } from './server/command.js';

@CommandRouting({
    commands: [
        DaemonCommand,
        ServerCommand,
    ]
})
export class AppRouting {}