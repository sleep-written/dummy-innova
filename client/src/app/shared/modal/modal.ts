import type { ModalOptionsAction, ModalOptions } from './interfaces';

import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MarkdownComponent
  ],
  providers: [
  ],
  selector: 'app-modal',
  styleUrl: './modal.scss',
  templateUrl: './modal.html',
})
export class Modal<T> {
  readonly #matDialogRef = inject<MatDialogRef<Modal<T>, T>>(MatDialogRef);
  readonly data = inject<ModalOptions<T>>(MAT_DIALOG_DATA);

  runAction(action: ModalOptionsAction<T>): void {
    const res = action.callback?.() ?? undefined;
    this.#matDialogRef.close(res);
  }
}
