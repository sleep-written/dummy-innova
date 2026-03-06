import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { GridComponent, GridView } from '@bleed-believer/kendo-grid-client';
import { firstValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';

import { ProcMaterialtypesItem } from './proc-materialtypes-item.js';
import { TargetDialog } from './target-dialog';
import { Service } from './service.js';
import { Modal } from '@shared/modal';

@Component({
    selector: 'app-proc-materialtypes',
    standalone: false,
    templateUrl: './proc-materialtypes.html',
    styleUrl: './proc-materialtypes.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProcMaterialtypes extends GridComponent<ProcMaterialtypesItem> implements OnInit {
    #service = inject(Service);
    #dialog = inject(MatDialog);
    #modal = inject(Modal);
    #title = inject(Title);

    constructor() {
        const changeDet = inject(ChangeDetectorRef);
        super(changeDet);
    }

    override async getData(): Promise<GridView<ProcMaterialtypesItem> | null> {
        try {
            return await this.#service.get(this.dataRequest);
        } catch (err) {
            await this.#modal.openError(err);
            return null;
        }
    }

    async ngOnInit(): Promise<void> {
        this.#title.setTitle('Material Types');
        return this.update();
    }

    async set(data?: ProcMaterialtypesItem): Promise<void> {
        const dialog = this.#dialog.open(TargetDialog, {
            data,
            width: 'calc(100dvw - 2rem)',
            maxWidth: '480px',
            maxHeight: 'unset!important',
            disableClose: true
        });

        await firstValueFrom(dialog.afterClosed());
        return this.update();
    }

    async delete(data: ProcMaterialtypesItem): Promise<void> {
        const confirm = await this.#modal.open({
            icon: 'warning',
            color: 'error',
            content: `Do you want to delete the material type "${data.code}"?`,
            buttons: [
                {
                    icon: 'thumb_up',
                    text: 'Confirm',
                    value: true,
                    color: 'error'
                },
                {
                    icon: 'thumb_down',
                    text: 'Cancel',
                    value: false,
                    color: 'secondary'
                }
            ]
        });

        if (confirm) {
            try {
                await this.#service.delete(data.id);

            } catch (err) {
                await this.#modal.openError(err);

            } finally {
                return this.update();

            }
        }
    }
}
