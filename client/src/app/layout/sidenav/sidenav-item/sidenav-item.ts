import type { Menu } from '../menu';

import { Component, computed, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [
    MatListModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive
  ],
  selector: 'app-sidenav-item',
  styleUrl: './sidenav-item.scss',
  templateUrl: './sidenav-item.html',
  host: {
    role: 'none',
  },
})
export class SidenavItem {
  path = input.required<string | null>();
  icon = input.required<string>();
  text = input.required<string>();
  children = input.required<Menu[]>();

  protected readonly expanded = signal(false);
  protected readonly hasChildren = computed(() => this.children().length > 0);

  protected toggle(): void {
    this.expanded.update(x => !x);
  }
}
