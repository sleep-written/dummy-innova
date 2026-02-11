import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { NavBar } from './nav-bar';
import { NavBarItem } from './nav-bar-item/nav-bar-item';

import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    NavBar,
    NavBarItem,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [
    provideHttpClient()
  ],
  exports: [
    NavBar
  ]
})
export class NavBarModule { }
