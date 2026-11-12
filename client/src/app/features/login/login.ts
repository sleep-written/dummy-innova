import { Component, effect, inject, untracked } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { LoginService } from './login.service';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LoadingCard } from './loading-card';
import { SystemCard } from './system-card';
import { LoginCard } from './login-card';


@Component({
  imports: [
    MatButtonModule,
    MatCardModule,

    LoadingCard,
    SystemCard,
    LoginCard
  ],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  readonly loginService = inject(LoginService);
  readonly #snackBar = inject(MatSnackBar);

  constructor() {
    // Notify every time the system status request fails.
    effect(() => {
      const error = this.loginService.systemStatus.error();
      if (error) {
        untracked(() => this.#snackBar.open(
          this.#getErrorMessage(error),
          undefined,
          { duration: 1500 }
        ));
      }
    });
  }

  #getErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse && typeof error.error?.message === 'string') {
      return error.error.message;
    }

    return 'The system status could not be retrieved.';
  }
}
