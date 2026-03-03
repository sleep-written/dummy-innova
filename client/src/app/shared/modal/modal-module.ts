import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Modal } from './modal';
import { ModalContent } from './modal-content';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ModalContent
  ],
  imports: [
    CommonModule,

    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    Modal
  ]
})
export class ModalModule { }
