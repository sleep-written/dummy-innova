import { resolve } from 'node:path';
import { Env } from '@bleed-believer/env';

const envPath = resolve(import.meta.dirname, '../.env');
export const env = new Env(envPath, {
    variables: {
        sessionSecret: {
            rawName: 'SESSION_SECRET'
        },
        mssqlHost: {
            rawName: 'MSSQL_HOST',
            callback: v => v ?? 'localhost'
        },
        mssqlPort: {
            rawName: 'MSSQL_PORT',
            callback: v => typeof v === 'string'
            ?   parseInt(v)
            :   1433
        },
        mssqlUsername: {
            rawName: 'MSSQL_USERNAME',
            required: true
        },
        mssqlPassword: {
            rawName: 'MSSQL_PASSWORD',
            required: true
        },
        mssqlDatabase: {
            rawName: 'MSSQL_DATABASE',
            required: true
        }
    }
});