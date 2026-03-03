import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProcLayoutsRoutingModule } from './proc-layouts-routing-module';

import { TargetDialog } from './target-dialog';
import { ProcLayouts } from './proc-layouts';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

import { GridModule } from '@progress/kendo-angular-grid';

import { ModalModule } from '@shared/modal';
import { FlexGridTileModule } from '@shared/flex-grid-tile';

import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    TargetDialog,
    ProcLayouts,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProcLayoutsRoutingModule,

    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,

    GridModule,

    ModalModule,
    FlexGridTileModule,
  ],
  providers: [
    provideHttpClient()
  ]
})
export class ProcLayoutsModule {}
