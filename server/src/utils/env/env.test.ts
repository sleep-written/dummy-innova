import type { EnvInject } from './env.inject.js';
import { Env } from './env.js';
import test from 'node:test';

class Inject implements Required<EnvInject> {
    #readFileCount = 0;
    #stringData?: string;
    get readFileCount(): number {
        return this.#readFileCount;
    }

    #process: { env: NodeJS.ProcessEnv; };
    get process(): { env: NodeJS.ProcessEnv; } {
        return this.#process;
    }

    constructor(
        processEnv?: NodeJS.ProcessEnv,
        stringData?: string
    ) {
        this.#process = { env: processEnv ?? {} };
        this.#stringData = stringData;
    }

    readFileSync(_: string | URL, __: 'utf-8'): string {
        this.#readFileCount++;
        if (this.#stringData) {
            return this.#stringData;
        }

        const error = new Error('File not found') as Error & { code: string; };
        error.code = 'ENOENT';
        throw error;
    }
}

test('Load simple env data', (t: test.TestContext) => {
    const inject = new Inject(
        { BAK: 'baz' },
        'FOO=bar',
    );
    
    const env = new Env('', inject);
    const fooRes = env.get('FOO');
    const bakRes = env.get('BAK');

    t.assert.strictEqual(inject.readFileCount, 1);
    t.assert.strictEqual(fooRes, 'bar');
    t.assert.strictEqual(bakRes, 'baz');
});

test('Load parsed env data', (t: test.TestContext) => {
    const inject = new Inject(
        {
            FOO: 'true',
            BAR: '666'
        },
        'FOO=false'
    );

    const env = new Env('', inject);
    const fooRes = env.get('FOO', v => v === 'true');
    const barRes = env.get('BAR', v => parseInt(v));

    t.assert.strictEqual(inject.readFileCount, 1);
    t.assert.strictEqual(fooRes, true);
    t.assert.strictEqual(barRes, 666);
});

test('Load non existing env data', (t: test.TestContext) => {
    const inject = new Inject();
    const env = new Env('', inject);
    try {
        env.get('FOO');
        throw new Error('Invalid status');
    } catch (err: any) {
        t.assert.ok(err instanceof Error);
        t.assert.strictEqual(
            err.message,
            `The environment variable "FOO" doesn't exist`
        );
    }
});