import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'base-companies',
    loadChildren: () => import('./base-companies').then((m) => m.BaseCompaniesModule),
  },
  {
    path: 'proc-layouts',
    loadChildren: () => import('./proc-layouts').then((m) => m.ProcLayoutsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintainersRoutingModule {}
