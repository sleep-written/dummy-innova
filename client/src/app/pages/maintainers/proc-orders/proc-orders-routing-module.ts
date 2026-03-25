import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcOrders } from './proc-orders';

const routes: Routes = [{ path: '', component: ProcOrders }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcOrdersRoutingModule {}
