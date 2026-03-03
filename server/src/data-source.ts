import { DataSource } from 'typeorm';
import { resolve } from 'node:path';
import { ENV } from './env.js';

export const dataSource = new DataSource({
    type: 'mssql',
    host: ENV.get('DUMMY_INNOVA_TYPEORM_HOST'),
    port: ENV.get('DUMMY_INNOVA_TYPEORM_PORT', v => parseInt(v)),
    username: ENV.get('DUMMY_INNOVA_TYPEORM_USERNAME'),
    password: ENV.get('DUMMY_INNOVA_TYPEORM_PASSWORD'),
    database: ENV.get('DUMMY_INNOVA_TYPEORM_DATABASE'),
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