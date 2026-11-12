import { getEndpoint } from './get.endpoint.ts';
import { Router } from 'express';

export const menuRouter = Router()
    .use(getEndpoint);