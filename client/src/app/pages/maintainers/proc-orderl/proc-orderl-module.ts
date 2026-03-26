import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProcOrderlRoutingModule } from './proc-orderl-routing-module';

import { ProcOrderl } from './proc-orderl';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { GridModule } from '@progress/kendo-angular-grid';

import { ModalModule } from '@shared/modal';
import { PrimitiveSpanModule } from '@shared/primitive-span';

import { provideHttpClient } from '@angular/common/http';

@NgModule({
    declarations: [ProcOrderl],
    imports: [
        CommonModule,
        RouterModule,
        ProcOrderlRoutingModule,

        MatCardModule,
        MatIconModule,
        MatButtonModule,

        GridModule,

        ModalModule,
        PrimitiveSpanModule,
    ],
    providers: [
        provideHttpClient()
    ]
})
export class ProcOrderlModule {}
