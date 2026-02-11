import { ChangeDetectionStrategy, Component, inject, OnInit, model } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Menu } from './menu.js';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  styleUrl: './nav-bar.scss',
  templateUrl: './nav-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBar implements OnInit {
  #httpClient = inject(HttpClient);

  menus = model<Menu[]>([]);

  async ngOnInit(): Promise<void> {
    const obs = this.#httpClient.get<Menu[]>('api/menu');
    const res = await firstValueFrom(obs);
    this.menus.set(res);
  }
}
