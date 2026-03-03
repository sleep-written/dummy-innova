import { Component, input, model } from '@angular/core';

import { Menu } from '../menu';

@Component({
  selector: 'app-navbar-item',
  standalone: false,
  templateUrl: './navbar-item.html',
  styleUrl: './navbar-item.scss',
})
export class NavbarItem {
  closed = model(true);
  value = input.required<Menu>();
}
