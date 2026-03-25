import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcOrderl } from './proc-orderl';

const routes: Routes = [{ path: '', component: ProcOrderl }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcOrderlRoutingModule {}
