import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { Sidenav } from './sidenav';

describe('Sidenav', () => {
  let fixture: ComponentFixture<Sidenav>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidenav],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([{ path: '**', children: [] }])],
    }).compileComponents();

    fixture = TestBed.createComponent(Sidenav);
    http = TestBed.inject(HttpTestingController);
  });

  it('should render the menus returned by the API', async () => {
    fixture.detectChanges();
    TestBed.tick();
    http.expectOne('/api/menu').flush([
      { path: '/login', icon: 'login', text: 'Login', children: [] },
      { path: null, icon: 'handyman', text: 'Maintainers', children: [
        { path: '/proc-materials', icon: 'package_2', text: 'Materials', children: [] },
      ] },
    ]);
    await fixture.whenStable();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('a[href="/login"]')?.textContent).toContain('Login');
    expect(el.querySelector('button[aria-expanded="false"]')?.textContent).toContain('Maintainers');
  });

  it('should show an error when the request fails', async () => {
    fixture.detectChanges();
    TestBed.tick();
    http.expectOne('/api/menu').flush(null, { status: 500, statusText: 'Error' });
    await fixture.whenStable();

    expect((fixture.nativeElement as HTMLElement).querySelector('[role="alert"]')).toBeTruthy();
  });
});
