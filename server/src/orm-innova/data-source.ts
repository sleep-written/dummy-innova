import { DataSource } from 'typeorm';
import { resolve } from 'node:path';
import { Env } from '@utils/env/index.js';

const env = new Env();
export const ormInnovaDataSource = new DataSource({
    type: 'mssql',
    host: env.get('DUMMY_INNOVA_TYPEORM_HOST'),
    port: env.get('DUMMY_INNOVA_TYPEORM_PORT', v => parseInt(v)),
    username: env.get('DUMMY_INNOVA_TYPEORM_USERNAME'),
    password: env.get('DUMMY_INNOVA_TYPEORM_PASSWORD'),
    database: env.get('DUMMY_INNOVA_TYPEORM_DATABASE'),
    entities: [
        resolve(import.meta.dirname, 'entities/*.entity.{ts,js}')
    ],
    migrations: [
        resolve(import.meta.dirname, 'migrations/*.{ts,js}')
    ],
    options: {
        encrypt: false
    }
});