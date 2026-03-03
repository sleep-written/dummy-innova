import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Navbar } from './navbar';
import { NavbarItem } from './navbar-item';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    Navbar,
    NavbarItem,
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
    Navbar
  ]
})
export class NavbarModule { }
