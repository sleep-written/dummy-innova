import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcOrderlRoutingModule } from './proc-orderl-routing-module';
import { ProcOrderl } from './proc-orderl';

@NgModule({
  declarations: [ProcOrderl],
  imports: [CommonModule, ProcOrderlRoutingModule],
})
export class ProcOrderlModule {}
