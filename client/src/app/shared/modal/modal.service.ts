import type { ModalOptions } from './interfaces';

import { HttpErrorResponse } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { Modal } from './modal';

@Service()
export class ModalService {
    #matDialog = inject(MatDialog);

    open<T>(options: ModalOptions<T>): Promise<T | undefined> {
        const dialog = this.#matDialog.open<
            Modal<T>,
            ModalOptions<T>,
            T
        >(Modal, {
            data: options,
            disableClose: true
        });

        return firstValueFrom(dialog.beforeClosed());
    }

    openError(error: unknown): Promise<void> {
        let message = 'Undefined error';
        switch (true) {
            case error instanceof HttpErrorResponse: {
                if (typeof error.error?.message === 'string') {
                    message = error.error.message;
                } else if (typeof error.error === 'string') {
                    message = error.error;
                } else {
                    message = error.message;
                }
                break;
            }

            case error instanceof Error: {
                message = error.message;
            }
        }

        return this.open({
            type: 'error',
            message,
            actions: [
                {
                    icon: 'thumb_up',
                    text: 'Confirm',
                    color: 'error'
                }
            ]
        });
    }
}
