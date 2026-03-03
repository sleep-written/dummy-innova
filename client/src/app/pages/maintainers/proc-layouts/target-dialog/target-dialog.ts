import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProcLayoutsItem } from '../proc-layouts-item';
import { Service } from '../service';
import { Modal } from '@shared/modal';

@Component({
  selector: 'app-target-dialog',
  standalone: false,
  templateUrl: './target-dialog.html',
  styleUrl: './target-dialog.scss',
})
export class TargetDialog {
  #elementRef = inject(MatDialogRef<TargetDialog>);
  #snackBar = inject(MatSnackBar);
  #service = inject(Service);
  #modal = inject(Modal);

  form = new FormBuilder().nonNullable.group({
    id:     [ undefined as number | undefined ],
    code:   [ '', Validators.required ],
    name:   [ '', Validators.required ],
    active: [ false, Validators.required ],
  });

  get isNew(): boolean {
    return typeof this.form.controls.id.value !== 'number';
  }

  constructor() {
    const data = inject<ProcLayoutsItem>(
      MAT_DIALOG_DATA,
      { optional: true }
    );

    if (data) {
      this.form.setValue({
        id: data.id ?? null,
        active: !!data.active,
        code: data.code ?? '',
        name: data.name ?? '',
      });
    }
  }

  cancel(): void {
    this.#elementRef.close();
  }

  async save(): Promise<void> {
    try {
      this.form.disable();
      const value = this.form.getRawValue();
      await this.#service.set(value);

      this.#elementRef.close();
      this.#snackBar.open(
        'Changes saved successfully',
        'OK', { duration: 1500 }
      );

    } catch (err) {
      this.#elementRef.close();
      await this.#modal.openError(err);

    }
  }
}
