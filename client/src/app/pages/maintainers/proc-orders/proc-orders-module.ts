import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcOrdersRoutingModule } from './proc-orders-routing-module';
import { ProcOrders } from './proc-orders';

@NgModule({
  declarations: [ProcOrders],
  imports: [CommonModule, ProcOrdersRoutingModule],
})
export class ProcOrdersModule {}
