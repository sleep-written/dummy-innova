import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProcMaterialsRoutingModule } from './proc-materials-routing-module';

import { TargetDialog } from './target-dialog';
import { ProcMaterials } from './proc-materials';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { GridModule } from '@progress/kendo-angular-grid';
import { LabelModule } from '@progress/kendo-angular-label';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ComboBoxModule } from '@progress/kendo-angular-dropdowns';
import { FloatingLabelModule } from '@progress/kendo-angular-label';

import { ModalModule } from '@shared/modal';
import { FlexGridTileModule } from '@shared/flex-grid-tile';
import { KendoGridFiltersModule } from '@shared/kendo-grid-filters';
import { PrimitiveSpanModule } from '@shared/primitive-span';

import { provideHttpClient } from '@angular/common/http';

@NgModule({
    declarations: [
        TargetDialog,
        ProcMaterials,
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        ProcMaterialsRoutingModule,

        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatButtonModule,
        MatDialogModule,
        GridModule,
        LabelModule,
        InputsModule,
        ComboBoxModule,
        FloatingLabelModule,

        ModalModule,
        FlexGridTileModule,
        KendoGridFiltersModule,
        PrimitiveSpanModule,
    ],
    providers: [
        provideHttpClient()
    ]
})
export class ProcMaterialsModule {}
