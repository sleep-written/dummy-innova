import { Router } from 'express';

import { getEndpoint } from './get.endpoint.ts';
import { putEndpoint } from './put.endpoint.ts';

export const systemRouter = Router()
    .use(getEndpoint)
    .use(putEndpoint);