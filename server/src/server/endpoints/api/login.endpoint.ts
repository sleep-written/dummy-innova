import { Auditor } from 'audit-var';
import { Router } from 'express';
import { verify } from '@node-rs/argon2';

import { EndpointError } from '#server/endpoint.error.ts';
import { dataSource } from '#data-source.ts';
import { userSchema } from '#entities/user.ts';

const auditor = new Auditor({
    type: 'object',
    keys: {
        username: { type: 'string', min: 3, max: 32 },
        password: { type: 'string', min: 8, max: 64 },
    }
});

export const loginEndpoint = Router().use('/', async (req, res) => {
    const { username, password } = auditor.audit(req.body);
    const user = await dataSource
        .manager
        .findOneBy(userSchema, { username });

    await new Promise(r => setTimeout(r, 1500));
    if (user && await verify(user.password, password)) {
        req.session.userId = user.id;
        req.session.save();
        res.end();
    } else {
        throw new EndpointError(401, `Wrong username/password combination`);
    }
});