import type { Request, Response } from 'express';
import type { Executable } from '@bleed-believer/commander';

import { Espresso } from '@bleed-believer/espresso';
import { Command } from '@bleed-believer/commander';
import { resolve } from 'node:path';
import express from 'express';

import { EndpointsRouting } from './endpoints/routing.js';
import { EndpointError } from './endpoint-error.js';
import { dataSource } from '@/data-source.js';
import { ENV } from '@/env.js';

@Command({
    name: 'server',
    path: 'server'
})
export class ServerCommand implements Executable {
    get client(): string {
        return resolve(
            import.meta.dirname,
            '../../../client/dist/client/browser'
        );
    }

    onError(err: Error, _: Request, res: Response): void {
        res.statusCode = err instanceof EndpointError
        ?   err.status
        :   500;

        res.type('text');
        res.end(err.message);
    }

    async start(): Promise<void> {
        const app = express();
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json({ strict: true }));

        const esp = new Espresso(app, { lowercase: true, verbose: true });
        esp.onError(this.onError.bind(this));
        esp.inject(EndpointsRouting);

        try {
            await dataSource.initialize();
            const port = ENV.get('DUMMY_INNOVA_SERVER_PORT', v => parseInt(v));
            const server = app.listen(port);

            await new Promise<void>((resolve, reject) => {
                server.once('listening', () => {
                    console.log(`@dummy-innova/server is listening at port ${port}`);
                });

                let error: Error | undefined;
                server.once('error', err => {
                    error = err;
                    server.close();
                });
                
                server.once('close', () => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });

                process.once('SIGINT', () => {
                    server.close();
                });
            });

        } catch (err) {
            throw err;

        } finally {
            if (dataSource.isInitialized) {
                await dataSource.destroy();
            }
        }
    }
}