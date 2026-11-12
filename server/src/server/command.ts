import type { CommandTarget } from '@bleed-believer/commander';
import type { Application } from 'express';

import { styleText } from 'node:util';
import { Command } from '@bleed-believer/commander';

import { endpointsRouter } from './endpoints/router.ts';
import { sessionOptions } from './session-options.ts';
import { dataSource } from '#data-source.ts';

import expressSession from 'express-session';
import express from 'express';

export const serverCommand = new Command({
    description: `Initialize the web server.`,
    positionals: 'server',
    flags: {
        port: {
            description: 'Port which the web server is listening. Default port is 8080',
            short: 'p',
            type: 'number',
        }
    },
    callback: ctx => new class implements CommandTarget {
        #port = ctx.flags.port ?? 8080;

        #listen(app: Application): Promise<void> {
            return new Promise<void>((resolve, reject) => {
                const server = app.listen(this.#port, () => {
                    console.info(`Web server is listening at port ${styleText('blueBright', this.#port.toString())}`);

                    const onAbort = () => {
                        if (server.listening) {
                            console.info(`Closing all web server connections...`);
                            server.closeAllConnections();
                            server.close();
                        }
                    };

                    const onClose = () => {
                        dispose();
                        resolve();
                    };

                    const onError = (e: Error) => {
                        dispose();
                        reject(e);
                    };

                    const dispose = () => {
                        server.off('close', onClose);
                        server.off('error', onError);
                        process.off('SIGINT', onAbort);
                        process.off('SIGTERM', onAbort);
                    };
                
                    server.once('close', onClose);
                    server.once('error', onError);
                    process.on('SIGINT', onAbort);
                    process.on('SIGTERM', onAbort);
                });
            });
        }

        async onInit(): Promise<void> {
            const app = express()
                .use(express.json())
                .use(expressSession(sessionOptions))
                .use(endpointsRouter);

            console.info(`Connecting with database...`);
            await dataSource.initialize();
            
            console.info(`Deploying the web server...`);
            await this.#listen(app);
    
            console.info(`Disposing the database connection...`);
            await dataSource.destroy();
        }
    }
})