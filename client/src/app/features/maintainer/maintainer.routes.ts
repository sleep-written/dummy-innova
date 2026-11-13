import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'proc-materials',
        loadComponent: () => import('./proc-materials').then(x => x.ProcMaterials)
    }
];