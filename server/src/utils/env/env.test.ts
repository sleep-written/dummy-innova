import type { EnvInject } from './env.inject.js';

import { parse, resolve } from 'node:path/posix';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { Env } from './env.js';

class Inject implements EnvInject {
    #fs: Record<string, Record<string, string>>;

    meta: { dirname: string; };
    process: { env: NodeJS.ProcessEnv; };

    parse = parse;
    resolve = resolve;

    constructor(
        dirname: string,
        data?: {
            fs?: Record<string, Record<string, string>>;
            env?: NodeJS.ProcessEnv;
        }
    ) {
        this.#fs = data?.fs ?? {};
        this.meta = { dirname };
        this.process = { env: data?.env ?? {} };
    }

    statSync(path: string) {
        if (!this.#fs[path]) {
            const error = new Error(`The file "${path}" doesn't exists`) as any;
            error.code = 'ENOENT';
            throw error;
        }

        return { isFile: () => true };
    }

    readFileSync(pathOrFileURL: string | URL, _: 'utf-8'): string {
        const path = pathOrFileURL instanceof URL
        ?   fileURLToPath(pathOrFileURL.href, { windows: false })
        :   pathOrFileURL;

        this.statSync(path);
        return Object
            .entries(this.#fs[path])
            .map(([ k, v ]) => `${k}=${v}`)
            .join('\n');
    }
}

test('new Env(); Read values from distinct origins', (t: test.TestContext) => {
    const inject = new Inject(`/path/to/project/src/lib/env`, {
        fs: {
            '/path/to/project/app.env': {
                FOO: '111',
                BAR: '222'
            },
            '/path/app.env': {
                BAR: '333'
            }
        },
        env: {
            FOO: '999',
            BAK: '666'
        }
    });

    const env = new Env('app.env', inject);
    const foo = env.get('FOO', v => parseInt(v));
    const bar = env.get('BAR', v => parseInt(v));
    const bak = env.get('BAK', v => parseInt(v));

    t.assert.strictEqual(foo, 999);
    t.assert.strictEqual(bar, 222);
    t.assert.strictEqual(bak, 666);
});