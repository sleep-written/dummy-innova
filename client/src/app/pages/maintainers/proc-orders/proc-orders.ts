import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { GridComponent, GridView } from '@bleed-believer/kendo-grid-client';
import { Title } from '@angular/platform-browser';
import * as dateFns from 'date-fns';

import { ProcOrdersItem } from './interfaces';
import { Service } from './service';
import { Modal } from '@shared/modal';

const ORDER_STATUS: Record<number, string> = {
    1: 'Closed',
    2: 'Canceled',
    3: 'On Hold',
    4: 'Open',
    5: 'Completed',
    6: 'Closed/Completed',
    7: 'Dispatched',
    8: 'Confirmed',
    9: 'Not Confirmed',
};

@Component({
    selector: 'app-proc-orders',
    standalone: false,
    templateUrl: './proc-orders.html',
    styleUrl: './proc-orders.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProcOrders extends GridComponent<ProcOrdersItem> implements OnInit {
    #service = inject(Service);
    #modal = inject(Modal);
    #title = inject(Title);

    constructor() {
        const changeDet = inject(ChangeDetectorRef);
        super(changeDet);
    }

    override async getData(): Promise<GridView<ProcOrdersItem> | null> {
        try {
            return await this.#service.get(this.dataRequest);
        } catch (err) {
            await this.#modal.openError(err);
            return null;
        }
    }

    ngOnInit(): Promise<void> {
        this.#title.setTitle('Orders');
        return this.update();
    }

    getOrderStatus(value: number): string {
        return ORDER_STATUS[value] ?? '--';
    }

    formatDate(input: Date | undefined, format: string): string {
        return input instanceof Date || typeof input === 'string'
        ?   dateFns.format(input, format)
        :   '--';
    }
}
