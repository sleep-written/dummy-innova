import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { GridComponent, GridView } from '@bleed-believer/kendo-grid-client';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';

import { BaseCompaniesItem, ProcMaterialsItem } from './interfaces';
import { TargetDialog } from './target-dialog';
import { Service } from './service';
import { Modal } from '@shared/modal';

@Component({
    selector: 'app-proc-materialc',
    standalone: false,
    templateUrl: './proc-materialc.html',
    styleUrl: './proc-materialc.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProcMaterialc extends GridComponent<BaseCompaniesItem> implements OnInit {
    #activatedRoute = inject(ActivatedRoute);
    #service = inject(Service);
    #dialog = inject(MatDialog);
    #modal = inject(Modal);
    #title = inject(Title);

    material!: ProcMaterialsItem;

    constructor() {
        const changeDet = inject(ChangeDetectorRef);
        super(changeDet);
    }

    override async getData(): Promise<GridView<BaseCompaniesItem> | null> {
        try {
            const id = parseInt(this.#activatedRoute.snapshot.params['id']);
            const { material, customers } = await this.#service.get(
                id,
                this.dataRequest
            );

            this.material = material;
            return customers;

        } catch (err) {
            await this.#modal.openError(err);
            return null;
        }
    }

    async ngOnInit(): Promise<void> {
        this.#title.setTitle('Material Settings');
        return this.update();
    }

    async set(data?: ProcMaterialc): Promise<void> {
        const dialog = this.#dialog.open(TargetDialog, {
            data,
            width: 'calc(100dvw - 4rem)',
            maxWidth: '1024px'
        });

        await firstValueFrom(dialog.afterClosed());
        return this.update();
    }

    async delete(data: ProcMaterialc): Promise<void> {
        try {
            // await this.#service.deleteConfig(config.id);
            return this.update();
        } catch (err) {
            await this.#modal.openError(err);
        }
    }
}
