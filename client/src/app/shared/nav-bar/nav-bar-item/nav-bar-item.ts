import { Component, input, model } from '@angular/core';
import { Menu } from '../menu';

@Component({
  selector: 'app-nav-bar-item',
  standalone: false,
  templateUrl: './nav-bar-item.html',
  styleUrl: './nav-bar-item.scss',
})
export class NavBarItem {
  menu = input.required<Menu>();
  closed = model<boolean>(true);
}
