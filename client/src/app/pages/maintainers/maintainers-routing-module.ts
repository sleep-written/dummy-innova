import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'base-companies',
    loadChildren: () => import('./base-companies').then((m) => m.BaseCompaniesModule),
  },
  {
    path: 'proc-materialtypes',
    loadChildren: () => import('./proc-materialtypes').then((m) => m.ProcMaterialtypesModule),
  },
  {
    path: 'proc-materials',
    loadChildren: () => import('./proc-materials').then((m) => m.ProcMaterialsModule),
  },
  {
    path: 'proc-layouts',
    loadChildren: () => import('./proc-layouts').then((m) => m.ProcLayoutsModule),
  },
  {
    path: 'proc-materialc/:id',
    loadChildren: () => import('./proc-materialc').then((m) => m.ProcMaterialcModule),
  },
  {
    path: 'proc-orders',
    loadChildren: () => import('./proc-orders/proc-orders-module').then((m) => m.ProcOrdersModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintainersRoutingModule {}
