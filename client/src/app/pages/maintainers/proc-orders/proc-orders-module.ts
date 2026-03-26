import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProcOrdersRoutingModule } from './proc-orders-routing-module';
import { ProcOrders } from './proc-orders';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { GridModule } from '@progress/kendo-angular-grid';

import { ModalModule } from '@shared/modal';
import { PrimitiveSpanModule } from '@shared/primitive-span';

import { provideHttpClient } from '@angular/common/http';

@NgModule({
    declarations: [ProcOrders],
    imports: [
        CommonModule,
        RouterModule,
        ProcOrdersRoutingModule,

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
export class ProcOrdersModule {}
