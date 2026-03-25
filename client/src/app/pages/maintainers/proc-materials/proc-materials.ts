import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { GridComponent, GridView } from '@bleed-believer/kendo-grid-client';
import { firstValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';

import { SystemtypeItem, ProcMaterialsItem, ProcMaterialtypesItem } from './interfaces';
import { TargetDialog } from './target-dialog';
import { Service } from './service';
import { Modal } from '@shared/modal';

@Component({
    selector: 'app-proc-materials',
    standalone: false,
    templateUrl: './proc-materials.html',
    styleUrl: './proc-materials.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProcMaterials extends GridComponent<ProcMaterialsItem> implements OnInit {
    #service = inject(Service);
    #dialog = inject(MatDialog);
    #modal = inject(Modal);
    #title = inject(Title);

    materialtypes: ProcMaterialtypesItem[] = [];
    systemtypes: SystemtypeItem[] = [];

    constructor() {
        const changeDet = inject(ChangeDetectorRef);
        super(changeDet);
    }

    override async getData(): Promise<GridView<ProcMaterialsItem> | null> {
        try {
            const [ systemtypes, materialtypes, data ] = await Promise.all([
                this.#service.getSystemtype(),
                this.#service.getMaterialtype(),
                this.#service.get(this.dataRequest)
            ]);

            this.materialtypes = materialtypes;
            this.systemtypes = systemtypes;

            return data;
        } catch (err) {
            await this.#modal.openError(err);
            return null;
        }
    }

    ngOnInit(): Promise<void> {
        this.#title.setTitle('Materials');
        return this.update();
    }

    getSystemtype(value: number): string {
        return this.systemtypes.find(x => x.value === value)?.text ?? '--';
    }
    
    async set(value?: ProcMaterialsItem): Promise<void> {
        const packagings = await this.#service.getPackagings();
        const systemtypes = this.systemtypes;
        const materialtypes = this.materialtypes;
        const dialog = this.#dialog.open(TargetDialog, {
            data: { value, systemtypes, materialtypes, packagings },
            width: 'calc(100dvw - 2rem)',
            maxWidth: '800px',
            maxHeight: 'unset!important',
            disableClose: true
        });
    
        await firstValueFrom(dialog.afterClosed());
        return this.update();
    }

    async delete(data: ProcMaterialsItem): Promise<void> {
        const confirm = await this.#modal.open({
            icon: 'warning',
            color: 'error',
            content: `Do you want to delete the material "${data.code}"?`,
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
