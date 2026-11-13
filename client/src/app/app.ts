import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { SessionChip } from '@layout/session-chip';
import { Sidenav } from '@layout/sidenav';

@Component({
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,

    SessionChip,
    Sidenav
  ],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  sidenavOpened = signal(false);

  constructor() {
    // Close the sidenav after navigating through one of its links.
    inject(Router).events
      .pipe(filter(e => e instanceof NavigationEnd))
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.sidenavOpened.set(false));
  }
}
