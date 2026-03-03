import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcLayouts } from './proc-layouts';

const routes: Routes = [{ path: '', component: ProcLayouts }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcLayoutsRoutingModule {}
