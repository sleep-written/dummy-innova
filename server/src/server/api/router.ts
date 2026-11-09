import { Router } from 'express';

export const apiRouter = Router()
    .use(await import('./client.controller.ts').then(x => x.clientController))