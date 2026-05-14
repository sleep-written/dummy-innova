import type { ParsedPath } from 'node:path';

export interface Stats {
    isFile(): boolean;
}

export interface EnvInject {
    readFileSync?(
        pathOrFileURL: string | URL,
        encoding: 'utf-8'
    ): string;

    statSync?(path: string): Stats;

    resolve?(...p: string[]): string;

    parse?(p: string): ParsedPath;

    process?: {
        env: NodeJS.ProcessEnv;
    };

    meta?: {
        dirname: string;
    };
}