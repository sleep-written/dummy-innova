import { Component } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

@Component({
  imports: [
    MatProgressSpinnerModule,
    MatCardModule
  ],
  selector: 'app-loading-card',
  styleUrl: './loading-card.scss',
  templateUrl: './loading-card.html',
})
export class LoadingCard {}
