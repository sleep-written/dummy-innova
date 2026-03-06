import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcMaterialc } from './proc-materialc';

const routes: Routes = [{ path: '', component: ProcMaterialc }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcMaterialcRoutingModule {}
