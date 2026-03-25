import type { EnvInject } from './env.inject.js';
import { accessSync, readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';
import { parse, resolve } from 'node:path';

export class Env {
    #inject: EnvInject;
    #data?: NodeJS.ProcessEnv;

    constructor(inject?: EnvInject) {
        this.#inject = inject ?? {
            process,
            accessSync,
            readFileSync,
        };
    }

    #getPath(): string {
        let path = import.meta.dirname;
        while (parse(path).root !== path) {
            try {
                const completePath = resolve(path, 'app.env');
                this.#inject.accessSync(completePath);
                return completePath;
            } catch {
                path = resolve(path, '..');
            }
        }

        throw new Error(`No file "app.env" found`);
    }

    #load(): NodeJS.ProcessEnv {
        if (this.#data) {
            return this.#data;
        }

        try {
            const path = this.#getPath();
            const text = this.#inject.readFileSync(path, 'utf-8');
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