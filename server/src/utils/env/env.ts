import type { EnvInject } from './env.inject.js';

import { statSync, readFileSync } from 'node:fs';
import { parse, resolve } from 'node:path';
import { parseEnv } from 'node:util';

export class Env {
    #filename: string;
    #inject: Required<EnvInject>;

    constructor(filename: string, inject?: EnvInject) {
        this.#filename = filename ?? 'app.env';
        this.#inject = {
            meta:           inject?.meta    ?? import.meta,
            process:        inject?.process ?? process,

            parse:          inject?.parse?.bind(inject)           ?? parse,
            resolve:        inject?.resolve?.bind(inject)         ?? resolve,
            statSync:       inject?.statSync?.bind(inject)        ?? statSync,
            readFileSync:   inject?.readFileSync?.bind(inject)    ?? readFileSync,
        };
    }
    
    #getEnvVarValue(name: string): string | undefined {
        if (typeof this.#inject.process.env[name] === 'string') {
            return this.#inject.process.env[name];
        }

        let path = this.#inject.meta.dirname;
        let root = this.#inject.parse(path).root;
        while (path !== root) {
            try {
                const fullPath = this.#inject.resolve(path, this.#filename);
                const stats = this.#inject.statSync(fullPath);
                if (stats.isFile()) {
                    const txt = this.#inject.readFileSync(fullPath, 'utf-8');
                    const env = parseEnv(txt);
                    if (typeof env[name] === 'string') {
                        return env[name];
                    }
                }

            } catch (err: any) {
                switch (err?.code) {
                    case 'EACCES':
                    case 'ENOENT': {
                        break;
                    }

                    default: {
                        throw err;
                    }
                }
            } finally {
                path = this.#inject.resolve(path, '..');
            }
        }

        return undefined;
    }

    get(name: string): string;
    get<T>(name: string, parser: (v: string) => T): T;
    get<T = string>(name: string, parser?: (v: string) => T): T {
        const rawValue = this.#getEnvVarValue(name);
        if (typeof rawValue !== 'string') {
            throw new Error(`The environment variable "${name}" doesn't exist`);
        }

        return parser
        ?   parser(rawValue)
        :   rawValue as T;
    }
}