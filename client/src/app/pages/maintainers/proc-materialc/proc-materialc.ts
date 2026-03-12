import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { GridComponent, GridView } from '@bleed-believer/kendo-grid-client';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { SettingsItem, ProcMaterialsItem } from './interfaces';
import { Service } from './service';
import { Modal } from '@shared/modal';
import { MatDialog } from '@angular/material/dialog';
import { TargetDialog } from './target-dialog';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-proc-materialc',
    standalone: false,
    templateUrl: './proc-materialc.html',
    styleUrl: './proc-materialc.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProcMaterialc extends GridComponent<SettingsItem> implements OnInit {
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

    override async getData(): Promise<GridView<SettingsItem> | null> {
        try {
            return await this.#service.getSettings(this.material.id, this.dataRequest);
        } catch (err) {
            await this.#modal.openError(err);
            return null;
        }
    }

    async ngOnInit(): Promise<void> {
        this.#title.setTitle('Material Settings');

        try {
            const id = parseInt(this.#activatedRoute.snapshot.params['id']);
            this.material = await this.#service.get(id);
            return this.update();
        } catch (err) {
            await this.#modal.openError(err);
        }
    }

    async set(id?: number): Promise<void> {
        const dialog = this.#dialog.open(TargetDialog, {
        });

        await firstValueFrom(dialog.afterClosed());
        return this.update();
    }

    async delete(id: number): Promise<void> {
        try {
            // await this.#service.deleteConfig(config.id);
            return this.update();
        } catch (err) {
            await this.#modal.openError(err);
        }
    }
}
