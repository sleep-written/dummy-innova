import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { disabled, form, maxLength, minLength, required } from '@angular/forms/signals';

import { FormRoot } from '@angular/forms/signals';
import { FormField } from '@angular/forms/signals';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { LoginService } from '../login.service.js';
import { ModalService } from '@shared/modal/index.js';
import { onUsernameInput } from '../on-username-input';

@Component({
  imports: [
    FormRoot,
    FormField,

    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressBarModule,
  ],
  selector: 'app-login-card',
  styleUrl: './login-card.scss',
  templateUrl: './login-card.html',
})
export class LoginCard {
  readonly #router = inject(Router);
  readonly #matSnackBar = inject(MatSnackBar);
  readonly #loginService = inject(LoginService);
  readonly #modalService = inject(ModalService);

  readonly model = signal({
    username: '',
    password: '',
  });

  readonly form = form(
    this.model,
    path => {
      required(path.username,       { message: 'This field is required' });
      minLength(path.username, 3,   { message: 'Must have at least 3 characters' });
      maxLength(path.username, 32,  { message: 'Must have at most 32 characters' });

      required(path.password,       { message: 'This field is required' });
      minLength(path.password, 8,   { message: 'Must have at least 8 characters' });
      maxLength(path.password, 64,  { message: 'Must have at most 64 characters' });

      disabled(path, { when: r => r.state.submitting() });
    },
    {
      submission: {
        action: this.onSubmissionAction.bind(this)
      }
    }
  );

  onUsernameInput(event: Event): void {
    return onUsernameInput(event, this.form);
  }

  async onSubmissionAction(): Promise<void> {
    try {
      const { username, password } = this.model();
      await this.#loginService.login(username, password);

      this.#router.navigate([ '/' ]);
      this.#matSnackBar.open(
        'Login successfull', 'OK',
        { duration: 1500 }
      );

    } catch (err) {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        this.#matSnackBar.open(
          err.error, 'OK',
          { duration: 1500 }
        );

      } else {
        await this.#modalService.openError(err);

      }
    }
  }
}
