import { CommandRouting } from '@bleed-believer/commander';

import { StartCommand } from './start/command.js';

@CommandRouting({
    commands: [
        StartCommand,
    ]
})
export class AppRouting {}