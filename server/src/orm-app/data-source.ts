import { resolve } from 'node:path';
import { DataSource } from 'typeorm';

export const ormAppDataSource = new DataSource({
    type: 'better-sqlite3',
    database: resolve(
        import.meta.dirname,
        '../../app.db'
    ),
    entities: [
        resolve(import.meta.dirname, 'entities/*.entity.{ts,js}')
    ],
    migrations: [
        resolve(import.meta.dirname, 'migrations/*.{ts,js}')
    ]
});