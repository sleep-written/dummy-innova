import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GridComponent, GridView } from '@bleed-believer/kendo-grid-client';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';

import { ProcLayoutsItem } from './proc-layouts-item.js';
import { TargetDialog } from './target-dialog';
import { Service } from './service.js';
import { Modal } from '@shared/modal';
import { ColumnMenuSettings } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-proc-layouts',
  standalone: false,
  templateUrl: './proc-layouts.html',
  styleUrl: './proc-layouts.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProcLayouts extends GridComponent<ProcLayoutsItem> implements OnInit {
  #service = inject(Service);
  #dialog = inject(MatDialog);
  #modal = inject(Modal);
  #title = inject(Title);

  columnMenu: ColumnMenuSettings = {
    columnChooser: false
  };

  constructor() {
    const changeDet = inject(ChangeDetectorRef);
    super(changeDet);
  }

  override async getData(): Promise<GridView<ProcLayoutsItem> | null> {
    try {
      return await this.#service.get(this.dataRequest);
    } catch (err) {
      await this.#modal.openError(err);
      return null;
    }
  }

  async ngOnInit(): Promise<void> {
    this.#title.setTitle('Layouts');
    this.update();
  }

  async set(data?: ProcLayoutsItem): Promise<void> {
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

  async delete(data: ProcLayoutsItem): Promise<void> {
    const confirm = await this.#modal.open({
      icon: 'warning',
      color: 'error',
      content: `Do you want to delete the layout "${data.code}"?`,
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
