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
  {
    path: 'proc-materials',
    loadChildren: () => import('./proc-materials').then((m) => m.ProcMaterialsModule),
  },
  {
    path: 'proc-materialtypes',
    loadChildren: () => import('./proc-materialtypes').then((m) => m.ProcMaterialtypesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintainersRoutingModule {}
