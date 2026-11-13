import { SessionChipService } from './session-chip.service';
import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  selector: 'app-session-chip',
  styleUrl: './session-chip.scss',
  templateUrl: './session-chip.html',
})
export class SessionChip {
  readonly #sessionChipService = inject(SessionChipService);
  readonly user = this.#sessionChipService.user;
}
