import { Component, inject, signal } from '@angular/core';
import { disabled, form, maxLength, minLength, required, validate } from '@angular/forms/signals';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { FormRoot } from '@angular/forms/signals';
import { FormField } from '@angular/forms/signals';

import { LoginService } from '../login.service';
import { ModalService } from '@shared/modal';
import { onUsernameInput } from '../on-username-input';

@Component({
  imports: [
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressBarModule,

    FormRoot,
    FormField,
  ],
  selector: 'app-system-card',
  styleUrl: './system-card.scss',
  templateUrl: './system-card.html',
})
export class SystemCard {
  readonly #loginService = inject(LoginService);
  readonly #modalService = inject(ModalService);

  /** Source of truth: the form reads from and writes to this signal. */
  readonly model = signal({
    username: '',
    password1: '',
    password2: '',
  });

  readonly form = form(
    this.model,
    path => {
      required(path.username,         { message: 'This field is required' });
      minLength(path.username, 3,     { message: 'Must have at least 3 characters' });
      maxLength(path.username, 32,    { message: 'Must have at most 32 characters' });

      required(path.password1,        { message: 'This field is required' });
      minLength(path.password1, 8,    { message: 'Must have at least 8 characters' });
      maxLength(path.password1, 64,   { message: 'Must have at most 64 characters' });

      required(path.password2,        { message: 'This field is required' });
      validate(path.password2, ({ value, valueOf }) =>
        value() === valueOf(path.password1)
        ? undefined
        : { kind: 'match', message: `Password doesn't match` }
      );

      // The whole form is disabled while it's being submitted.
      disabled(path, { when: ({ state }) => state.submitting() });
    },
    {
      submission: {
        action: async () => {
          const { username, password1 } = this.model();

          try {
            await this.#loginService.createSystemUser(username, password1);

          } catch (err) {
            await this.#modalService.openError(err);

          } finally {
            this.#loginService.systemStatus.reload();

          }

          return undefined;
        }
      }
    }
  );

  /**
   * Sanitizes the username directly on the `<input>` element. The effect above
   * only fixes the model: when the sanitized value equals the previous one
   * (e.g. typing `$` after `abc`), the model never really changes, so
   * `[formField]` doesn't write it back and the DOM keeps the invalid char.
   */
  protected onUsernameInput(event: Event): void {
    return onUsernameInput(event, this.form);
  }
}
