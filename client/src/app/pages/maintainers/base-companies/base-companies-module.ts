import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseCompaniesRoutingModule } from './base-companies-routing-module';

import { TargetDialog } from './target-dialog';
import { BaseCompanies } from './base-companies';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';

import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { FloatingLabelModule } from '@progress/kendo-angular-label';

import { ModalModule } from '@shared/modal';
import { FlexGridTileModule } from '@shared/flex-grid-tile';
import { PrimitiveSpanModule } from '@shared/primitive-span';

import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    TargetDialog,
    BaseCompanies,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BaseCompaniesRoutingModule,

    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatFormFieldModule,

    GridModule,
    InputsModule,
    FloatingLabelModule,

    ModalModule,
    FlexGridTileModule,
    PrimitiveSpanModule,
  ],
  providers: [
    provideHttpClient()
  ]
})
export class BaseCompaniesModule { }
