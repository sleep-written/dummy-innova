import { Commander } from '@bleed-believer/commander';

export const commander = new Commander([
    await import('./server/command.ts').then(x => x.serverCommand),
    await import('./help/command.ts').then(x => x.helpCommand),
]);