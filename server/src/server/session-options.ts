import type { SessionOptions } from 'express-session';

import { SQLite3Store } from '@bleed-believer/connect-sqlite3';
import { resolve } from 'node:path';
import { env } from '#env.ts';

const sessionPath = resolve(import.meta.dirname, '../../session.db');
export const sessionOptions: SessionOptions = {
    saveUninitialized: false,
    rolling: true,
    resave: false,
    cookie: { maxAge: 30 * 60_000 },
    secret: env.get('sessionSecret') ?? 'dummy-innnova',
    store: new SQLite3Store(sessionPath),
};

declare module 'express-session' {
    interface SessionData {
        userId?: number;
    }
}