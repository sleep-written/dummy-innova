import type { EnvInject } from './env.inject.js';
import { readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';

export class Env {
    #inject: EnvInject;
    #data?: NodeJS.ProcessEnv;

    #pathOrFileURL: string | URL;
    get pathOrFileURL(): string | URL {
        return this.#pathOrFileURL;
    }

    constructor(pathOrFileURL: string | URL, inject?: EnvInject) {
        this.#pathOrFileURL = pathOrFileURL;
        this.#inject = inject ?? {
            process,
            readFileSync,
        };
    }

    #load(): NodeJS.ProcessEnv {
        if (this.#data) {
            return this.#data;
        }

        try {
            const text = this.#inject.readFileSync(this.#pathOrFileURL, 'utf-8');
            this.#data = parseEnv(text);

        } catch (err: any) {
            switch (err.code) {
                case 'ENOENT':
                case 'EACCES': {
                    this.#data = {};
                    break;
                }

                default: {
                    throw err;
                }
            }
        }

        Object
            .entries(this.#inject.process.env)
            .forEach(([ k, v ]) => {
                if (typeof v === 'string') {
                    this.#data![k] = v;
                }
            });

        return this.#data;
    }

    get(name: string): string;
    get<T>(name: string, parser: (v: string) => T): T;
    get<T = string>(name: string, parser?: (v: string) => T): T {
        const data = this.#load();
        const rawValue = data[name];
        if (typeof rawValue !== 'string') {
            throw new Error(`The environment variable "${name}" doesn't exist`);
        }

        return parser
        ?   parser(rawValue)
        :   rawValue as T;
    }

    dispose(): void {
        this.#data = undefined;
    }
}