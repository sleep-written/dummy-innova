import { Component, inject, OnDestroy, OnInit, output, signal } from '@angular/core';
import { filter, firstValueFrom, Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Menu } from './menu';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit, OnDestroy {
  #httpClient = inject(HttpClient);
  #router = inject(Router);
  #sub?: Subscription;

  navigationEnd = output<NavigationEnd>();
  items = signal<Menu[]>([]);

  async ngOnInit(): Promise<void> {
    this.#sub = this.#router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(this.onRouterChange.bind(this));
  }

  ngOnDestroy(): void {
    this.#sub?.unsubscribe();
  }

  async onRouterChange(e: NavigationEnd): Promise<void> {
    this.navigationEnd.emit(e);

    const obs = this.#httpClient.get<Menu[]>('api/menu');
    const res = await firstValueFrom(obs);
    this.items.set(res);
  }
}
