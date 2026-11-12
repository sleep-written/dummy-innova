import { dataSource } from '#data-source.ts';
import { userSchema } from '#entities/user.ts';
import { Router } from 'express';

export const getEndpoint = Router().get('/', async (_, res) => {
    const { manager } = dataSource;
    const count = await manager.countBy(userSchema, {
        userType: {
            code: 'SYSTEM'
        }
    });

    res.json({ exists: count > 0 });
});