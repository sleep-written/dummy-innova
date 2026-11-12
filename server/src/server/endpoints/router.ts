import type { NextFunction, Request, Response } from 'express';

import { isAuditorError } from '#server/is-auditor-error.ts';
import { EndpointError } from '#server/endpoint.error.ts';
import { Router } from 'express';

export const endpointsRouter = Router()
    .use('/api', await import('./api/router.ts').then(x => x.apiRouter))
    .use(await import('./client.endpoint.ts').then(x => x.clientEndpoint))
    .use((err: Error, ___: Request, res: Response, nxt: NextFunction) => {
        if (err instanceof Error) {
            res.status(
                err instanceof EndpointError ? err.code :
                isAuditorError(err)          ? 400 :
                500
            );

            res.contentType('txt');
            res.end(err.message);

        } else {
            nxt();

        }
    });