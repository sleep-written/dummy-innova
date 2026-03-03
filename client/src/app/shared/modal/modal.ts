import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ModalContent } from './modal-content';
import { ModalOptions } from './modal-options';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Modal {
  #dialog = inject(MatDialog);

  open<T>(data: ModalOptions<T>): Promise<T | undefined> {
    const dialog = this.#dialog.open<
      ModalContent<T>,
      ModalOptions<T>,
      T
    >(ModalContent, {
      data,
      disableClose: data.disableClose
    });

    return firstValueFrom(dialog.afterClosed());
  }

  openError(error: unknown, disableClose?: boolean): Promise<void> {
    return this.open({
      icon: 'error',
      title: 'Error',
      color: 'error',
      disableClose,
      content:
        typeof error !== 'string'
        ? (error as any)?.message ?? 'Error not specified'
        : error,
      buttons: [
        { icon: 'thumb_up', text: 'Ok', value: undefined }
      ]
    });
  }
}
