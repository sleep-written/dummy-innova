import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProcMaterialsItem, ProcMaterialtypesItem, SystemtypeItem } from '../interfaces';
import { Service } from '../service';
import { Modal } from '@shared/modal';

@Component({
  selector: 'app-target-dialog',
  standalone: false,
  templateUrl: './target-dialog.html',
  styleUrl: './target-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TargetDialog {
  #elementRef = inject(MatDialogRef<TargetDialog>);
  #snackBar = inject(MatSnackBar);
  #service = inject(Service);
  #modal = inject(Modal);
  
  materialtypes: ProcMaterialtypesItem[] = [];
  systemtypes: SystemtypeItem[] = [];
  packagings: ProcMaterialsItem[] = [];
  form = new FormBuilder().nonNullable.group({
    id:             [ null as number | null ],
    code:           [ '', [ Validators.required, Validators.minLength(1) ] ],
    name:           [ '', [ Validators.required, Validators.minLength(1) ] ],
    active:         [ false, [ Validators.required ] ],
    systemtype:     [ null as number | null, Validators.required ],
    materialtypeId: [ null as number | null ],
    pkPackagingId:  [ null as number | null ],
    itPackagingId:  [ null as number | null ]
  });

  get isNew(): boolean {
    return typeof this.form.controls.id.value !== 'number';
  }

  constructor() {
    const data = inject<{
      materialtypes: ProcMaterialtypesItem[];
      systemtypes: SystemtypeItem[];
      packagings: ProcMaterialsItem[];
      value?: ProcMaterialsItem;
    }>(MAT_DIALOG_DATA);

    this.materialtypes = data.materialtypes;
    this.systemtypes = data.systemtypes;
    this.packagings = data.packagings;

    if (data.value) {
      this.form.setValue({
        id: data.value.id ?? null,
        code: data.value.code ?? '',
        name: data.value.name ?? '',
        active: !!data.value.active,
        systemtype: data.value.systemtype ?? null,
        materialtypeId: data.value.materialtype?.id ?? null,

        pkPackagingId: data.value.pkPackaging?.id ?? null,
        itPackagingId: data.value.itPackaging?.id ?? null,
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
