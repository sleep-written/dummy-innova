import { randomBytes } from 'crypto';
import { Auditor } from 'audit-var';
import { Router } from 'express';
import { hash } from '@node-rs/argon2';

import { userTypeSchema } from '#entities/user-type.ts';
import { EndpointError } from '#server/endpoint.error.ts';
import { dataSource } from '#data-source.ts';
import { userSchema } from '#entities/user.ts';

const auditor = new Auditor({
    type: 'object',
    keys: {
        username: { type: 'string', min: 3, max: 32 },
        password: { type: 'string', min: 8, max: 64 },
    }
})

export const putEndpoint = Router().put('/', async (req, res) =>{
    const body = auditor.audit(req.body);
    const username = body.username
        .toLowerCase()
        .replace(/[^0-9a-z\-_]/g, '');

    if (username !== body.username) {
        throw new EndpointError(400,
            `The username must have at least 3 valid characters. ` +
            `Only lowercase letters, numbers, "-" and "_" are allowed.`
        );
    }

    const password = await hash(body.password, { salt: randomBytes(16) });
    await dataSource.transaction('SERIALIZABLE', async manager => {
        const count = await manager.countBy(userSchema, {
            userType: { code: 'SYSTEM' }
        });

        if (count > 0) {
            throw new EndpointError(409, 'A SYSTEM user type is already registered');
        }

        const user =  manager.create(userSchema, {
            username,
            password,
            userType: await manager.findOneByOrFail(userTypeSchema, { code: 'SYSTEM' })
        });

        await manager.save(userSchema, user);
    });

    res.end();
});