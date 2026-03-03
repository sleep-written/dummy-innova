import { Env } from '@utils/env/index.js';

const url = new URL('../../app.env', import.meta.url);
export const ENV = new Env(url);