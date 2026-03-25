import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

import { ProcExpireMethodItem, ProcLayoutsItem, ProcMaterialcItem, ProcMaterialsItem } from '../interfaces';
import { Service } from '../service';
import { Modal } from '@shared/modal';

@Component({
  selector: 'app-target-dialog',
  standalone: false,
  templateUrl: './target-dialog.html',
  styleUrl: './target-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TargetDialog implements OnInit {
  #changeDet = inject(ChangeDetectorRef);
  #dialogRef = inject(MatDialogRef);
  #service = inject(Service);
  #modal = inject(Modal);

  customersLoading = false;
  expireMethods: ProcExpireMethodItem[] = [];
  packagings: ProcMaterialsItem[] = [];
  layouts: ProcLayoutsItem[] = [];
  form = new FormBuilder().nonNullable.group({
    id:              [ null as number | null ],
    active:          [ false, Validators.required ],
    description1:    [ null as string | null ],
    expire1:         [ null as number | null ],
    packsizeum:      [ null as number | null ],
    stacksizeum:     [ null as number | null ],
    palletpsizeum:   [ null as number | null ],
    palletssizeum:   [ null as number | null ],
    packagingId:     [ null as number | null ],
    pkPackagingId:   [ null as number | null ],
    itPackagingId:   [ null as number | null ],
    procLayoutITId:  [ null as number | null ],
    procLayoutPKId:  [ null as number | null ],
    expire1methodId: [ null as number | null ],
  });

  constructor() {
    const data = inject<ProcMaterialcItem>(MAT_DIALOG_DATA, { optional: true });
    if (data) {
      this.form.setValue({
        id:              data.id                ?? null,
        active:          data.active,
        description1:    data.description1      ?? null,
        expire1:         data.expire1           ?? null,
        packsizeum:      data.packsizeum        ?? null,
        stacksizeum:     data.stacksizeum       ?? null,
        palletpsizeum:   data.palletpsizeum     ?? null,
        palletssizeum:   data.palletssizeum     ?? null,
        packagingId:     data.packaging?.id     ?? null,
        pkPackagingId:   data.pkPackaging?.id   ?? null,
        itPackagingId:   data.itPackaging?.id   ?? null,
        procLayoutPKId:  data.procLayoutPK?.id  ?? null,
        procLayoutITId:  data.procLayoutIT?.id  ?? null,
        expire1methodId: data.expire1method?.id ?? null,
      });
    }
  }

  async ngOnInit(): Promise<void> {
    try {
      this.form.disable();
      this.customersLoading = true;
      this.#changeDet.detectChanges();

      await Promise.all([
        this.#service
          .getExpireMethods()
          .then(x => { this.expireMethods = x; }),

        this.#service
          .getPackagings()
          .then(x => { this.packagings = x; }),

        this.#service
          .getLayouts()
          .then(x => { this.layouts = x; })
      ]);

      this.form.enable();
      this.customersLoading = false;
      this.#changeDet.detectChanges();
    } catch (err) {
      this.#dialogRef.close();
      return this.#modal.openError(err);
    }
  }
}
