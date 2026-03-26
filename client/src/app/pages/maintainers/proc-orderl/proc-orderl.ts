import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { GridComponent, GridView } from '@bleed-believer/kendo-grid-client';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ProcOrderlItem, GridResult, ProcOrdersItem } from './interfaces';
import { Service } from './service';
import { Modal } from '@shared/modal';

const OL_STATUS: Record<number, string> = {
    1: 'Closed',
    2: 'Open',
    3: 'Complete',
    4: 'Canceled',
    5: 'On Hold',
};

@Component({
    selector: 'app-proc-orderl',
    standalone: false,
    templateUrl: './proc-orderl.html',
    styleUrl: './proc-orderl.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProcOrderl extends GridComponent<ProcOrderlItem> implements OnInit {
    #activatedRoute = inject(ActivatedRoute);
    #service = inject(Service);
    #modal = inject(Modal);
    #title = inject(Title);

    order?: ProcOrdersItem;
    amountIntlOptions: Intl.NumberFormatOptions = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    };

    override pageSize = 50;
    
    constructor() {
        const changeDet = inject(ChangeDetectorRef);
        super(changeDet);
    }

    get orderId(): number {
        return parseInt(this.#activatedRoute.snapshot.params['id']);
    }

    override async getData(): Promise<GridView<ProcOrderlItem> | null> {
        try {
            const { order, details } = await this.#service.get(
                this.orderId,
                this.dataRequest
            );

            if (!order) {
                throw new Error(`The order requested doesn't found`);

            }

            this.order = order;            
            this.#title.setTitle(`Order ${order.code}`);
            return details;

        } catch (err) {
            this.#title.setTitle(`Order not found`);
            await this.#modal.openError(err);
            return null;
        }
    }

    ngOnInit(): Promise<void> {
        this.#title.setTitle('Order Details');
        return this.update();
    }

    getOlStatus(value: number): string {
        return OL_STATUS[value] ?? '--';
    }
}
