import { AppRouting } from './app.routing.js';
import { Commander } from '@bleed-believer/commander';

const commander = new Commander(AppRouting, { linear: true, lowercase: true });
try {
    await commander.execute();

} catch (err) {
    console.error(err);
}