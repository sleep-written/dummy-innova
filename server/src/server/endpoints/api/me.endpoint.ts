import { dataSource } from '#data-source.ts';
import { userSchema, type User } from '#entities/user.ts';
import { Router } from 'express';

export const meEndpoint = Router().get('/', async (req, res) => {
    if (typeof req.session.userId === 'number') {
        const user = await dataSource.manager.findOne(userSchema, {
            where: { id: req.session.userId },
            select: {
                id: true,
                username: true,
                userType: {
                    id: true,
                    code: true,
                    description: true
                }
            },
            relations: {
                userType: true
            }
        });

        if (user) {
            delete (user as any).id;
            delete (user as any).userType?.id;
        }

        res.json(user);
    } else {
        res.json(null);
    }
});