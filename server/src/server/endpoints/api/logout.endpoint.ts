import { Router } from 'express';

export const logoutEndpoint = Router().delete('/', async (req, res) => {
    if (typeof req.session.userId === 'number') {
        delete req.session.userId;
        await new Promise(r => req.session.destroy(r));
    }

    await new Promise(r => setTimeout(r, 2500));
    res.end();
});