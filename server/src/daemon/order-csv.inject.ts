import type { EntityManager } from 'typeorm';

export interface OrderCSVInject {
    manager: EntityManager;
    readFile?(
        path: string,
        encoding: BufferEncoding
    ): Promise<string>;
}