import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LogoutService } from './logout.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  selector: 'app-logout',
  styleUrl: './logout.scss',
  templateUrl: './logout.html',
})
export class Logout implements OnInit, OnDestroy {
  readonly #logoutService = inject(LogoutService);
  readonly #matSnackBar = inject(MatSnackBar);
  readonly #disposed = signal(false);
  readonly #router = inject(Router);

  ngOnDestroy(): void {
    this.#disposed.set(true);
  }
  
  async ngOnInit(): Promise<void> {
    while(!this.#disposed()) {
      try {
        await this.#logoutService.logout();
        this.#matSnackBar.open(
          'Session closed successfully', 'OK',
          { duration: 1500 }
        );
        
        if (!this.#disposed()) {
          this.#router.navigate([ '/' ]);
        }

        break;

      } catch (err) {
        this.#matSnackBar.open(
          'Failed to logout, trying again...', 'OK',
          { duration: 1500 }
        );

        await new Promise(r => setTimeout(r, 500));
      }
    }
  }
}
