import type { Dirent } from 'node:fs';
import type { EntityManager, EntityTarget, FindManyOptions, ObjectLiteral } from 'typeorm';
import type { DataSource } from 'typeorm/browser';

export interface DaemonCommandInject {
    createAbortController?: () => AbortController;

    dataSource?: DataSource;

    env?: {
        get(name: string): string;
        get<T>(name: string, callback: (v: string) => T): T;
    };

    readFile?(
        path: string,
        encoding: BufferEncoding
    ): Promise<string>;

    resolve?(
        ...p: string[]
    ): string;

    readdir?(
        path: string,
        opts: {
            withFileTypes: true;
            recursive: true;
        }
    ): Promise<{
        parentPath: string;
        name: string;

        isFile(): boolean;
    }[]>;

    glob?(
        path: string,
        options: {
            cwd: string;
            withFileTypes: true;
        }
    ): NodeJS.AsyncIterator<Dirent<string>, undefined, any>;

    rm?(
        path: string,
        options: { force: true }
    ): Promise<void>;
}