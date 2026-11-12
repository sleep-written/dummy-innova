import { DataSource } from 'typeorm';
import { resolve } from 'node:path';
import { env } from './env.ts';

export const dataSource = new DataSource({
    type: 'mssql',
    host: env.get('mssqlHost'),
    port: env.get('mssqlPort'),
    username: env.get('mssqlUsername'),
    password: env.get('mssqlPassword'),
    database: env.get('mssqlDatabase'),

    entities: [
        resolve(import.meta.dirname, 'entities/*.{ts,js}'),
    ],
    migrations: [
        resolve(import.meta.dirname, 'migrations/*.{ts,js}'),
    ],
    options: {
        trustServerCertificate: true
    }
});