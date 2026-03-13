import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { GridView } from '@bleed-believer/kendo-grid-client';

// import { SettingsItem } from '../interfaces';
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
  #service = inject(Service);
  #modal = inject(Modal);
  
  customersLoading = false;

  async ngOnInit(): Promise<void> {
  }
}
