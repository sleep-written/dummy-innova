import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';

import { SidenavService } from './sidenav.service';

describe('SidenavService', () => {
  let service: SidenavService;
  let http: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([{ path: '**', children: [] }]),
      ],
    });
    service = TestBed.inject(SidenavService);
    http = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => http.verify());

  it('should fetch the menu when created', async () => {
    TestBed.tick();
    http.expectOne('/api/menu').flush([{ path: '/login', icon: 'login', text: 'Login', children: [] }]);
    await TestBed.inject(ApplicationRef).whenStable();
    expect(service.menus().map(x => x.text)).toEqual(['Login']);
  });

  it('should fetch the menu again after each navigation', async () => {
    TestBed.tick();
    http.expectOne('/api/menu').flush([]);
    await TestBed.inject(ApplicationRef).whenStable();

    // The first navigation is skipped: the initial request already covers it.
    await router.navigateByUrl('/');
    TestBed.tick();
    http.expectNone('/api/menu');

    await router.navigateByUrl('/logout');
    TestBed.tick();
    http.expectOne('/api/menu').flush([]);
  });
});
