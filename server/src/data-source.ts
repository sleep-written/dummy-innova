import { DataSource } from 'typeorm';
import { readFile } from 'node:fs/promises';
import { parseEnv } from 'node:util';
import { resolve } from 'node:path';

const url = new URL('../app.env', import.meta.url);
const env = await readFile(url, 'utf-8')
    .then(x => parseEnv(x))
    .catch(() => process.env);

export const dataSource = new DataSource({
    type: 'mssql',
    host: env.DUMMY_INNOVA_HOST,
    port: parseInt(env.DUMMY_INNOVA_PORT!),
    username: env.DUMMY_INNOVA_USERNAME,
    password: env.DUMMY_INNOVA_PASSWORD,
    database: env.DUMMY_INNOVA_DATABASE,
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