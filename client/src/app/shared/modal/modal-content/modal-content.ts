import { Component, inject } from '@angular/core';
import { ModalOptions } from '../modal-options';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-content',
  standalone: false,
  templateUrl: './modal-content.html',
  styleUrl: './modal-content.scss',
})
export class ModalContent<T> {
  #dialogRef = inject(MatDialogRef<ModalContent<T>>);
  data = inject<ModalOptions<T>>(MAT_DIALOG_DATA);

  close(v: T): void {
    this.#dialogRef.close(v);
  }
}
