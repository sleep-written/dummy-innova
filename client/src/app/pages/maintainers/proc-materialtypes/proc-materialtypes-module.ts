import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProcMaterialtypesRoutingModule } from './proc-materialtypes-routing-module';

import { TargetDialog } from './target-dialog';
import { ProcMaterialtypes } from './proc-materialtypes';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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
        ProcMaterialtypes,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProcMaterialtypesRoutingModule,

        MatCardModule,
        MatIconModule,
        MatInputModule,
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
export class ProcMaterialtypesModule {}
