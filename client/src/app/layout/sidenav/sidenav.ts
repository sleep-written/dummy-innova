import { Component, inject } from '@angular/core';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';

import { SidenavService } from './sidenav.service';
import { SidenavItem } from './sidenav-item';

@Component({
  imports: [
    MatListModule,
    MatProgressBarModule,
    SidenavItem
  ],
  selector: 'app-sidenav',
  styleUrl: './sidenav.scss',
  templateUrl: './sidenav.html',
})
export class Sidenav {
  protected readonly sidenavService = inject(SidenavService);
}
