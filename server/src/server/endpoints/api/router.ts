import { Router } from 'express';

export const apiRouter = Router()
    .use('/system', await import('./system/router.ts').then(x => x.systemRouter))
    .use('/logout', await import('./logout.endpoint.ts').then(x => x.logoutEndpoint))
    .use('/login', await import('./login.endpoint.ts').then(x => x.loginEndpoint))
    .use('/me', await import('./me.endpoint.ts').then(x => x.meEndpoint))
    .use('/menu', await import('./menu/router.ts').then(x => x.menuRouter))
    .use('/user', await import('./user/router.ts').then(x => x.userRouter))