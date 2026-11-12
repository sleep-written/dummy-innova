import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('@features/home').then(x => x.Home)
    },
    {
        path: 'login',
        loadComponent: () => import('@features/login').then(x => x.Login)
    },
    {
        path: 'logout',
        loadComponent: () => import('@features/logout').then(x => x.Logout)
    }
];
