import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { vi } from 'vitest';

import { LoginService } from './login.service';
import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let http: HttpTestingController;
  let snackBarOpen: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    snackBarOpen = vi.fn();

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MatSnackBar, useValue: { open: snackBarOpen } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  const failRequest = async (message: string) => {
    TestBed.tick();
    http.expectOne('/api/system')
      .flush({ message }, { status: 500, statusText: 'Error' });
    await fixture.whenStable();
  };

  it('should create', async () => {
    TestBed.tick();
    http.expectOne('/api/system').flush({ exists: false });
    await fixture.whenStable();
    expect(component).toBeTruthy();
  });

  it('should open a snackbar every time the request fails', async () => {
    await failRequest('Boom 1');
    expect(snackBarOpen).toHaveBeenCalledTimes(1);
    expect(snackBarOpen).toHaveBeenLastCalledWith('Boom 1', undefined, { duration: 1500 });

    TestBed.inject(LoginService).systemStatus.reload();
    await failRequest('Boom 2');
    expect(snackBarOpen).toHaveBeenCalledTimes(2);
    expect(snackBarOpen).toHaveBeenLastCalledWith('Boom 2', undefined, { duration: 1500 });
  });
});
