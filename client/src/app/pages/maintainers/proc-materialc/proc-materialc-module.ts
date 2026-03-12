import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcMaterialcRoutingModule } from './proc-materialc-routing-module';

import { TargetDialog } from './target-dialog';
import { ProcMaterialc } from './proc-materialc';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ComboBoxModule } from '@progress/kendo-angular-dropdowns';
import { FloatingLabelModule } from '@progress/kendo-angular-label';

import { ModalModule } from '@shared/modal';

import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    ProcMaterialc,
    TargetDialog
  ],
  imports: [
    CommonModule,
    ProcMaterialcRoutingModule,

    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,

    GridModule,
    InputsModule,
    ComboBoxModule,
    FloatingLabelModule,

    ModalModule,
  ],
  providers: [provideHttpClient()],
})
export class ProcMaterialcModule {}
