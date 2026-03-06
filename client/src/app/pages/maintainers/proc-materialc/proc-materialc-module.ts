import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcMaterialcRoutingModule } from './proc-materialc-routing-module';
import { ProcMaterialc } from './proc-materialc';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { GridModule } from '@progress/kendo-angular-grid';

import { ModalModule } from '@shared/modal';

import { provideHttpClient } from '@angular/common/http';

@NgModule({
    declarations: [ProcMaterialc],
    imports: [
        CommonModule,
        ProcMaterialcRoutingModule,

        MatCardModule,
        MatIconModule,
        MatButtonModule,
        GridModule,

        ModalModule,
    ],
    providers: [
        provideHttpClient()
    ]
})
export class ProcMaterialcModule {}
