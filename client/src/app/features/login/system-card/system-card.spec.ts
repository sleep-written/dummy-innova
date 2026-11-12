import { ComponentFixture, TestBed } from '@angular/core/testing';
import { submit } from '@angular/forms/signals';
import { vi } from 'vitest';

import { ModalService } from '@shared/modal';
import { LoginService } from '../login.service';
import { SystemCard } from './system-card';

describe('SystemCard', () => {
  let component: SystemCard;
  let fixture: ComponentFixture<SystemCard>;

  let resolveRequest: () => void;
  let rejectRequest: (err: unknown) => void;
  const loginService = {
    createSystemUser: vi.fn(),
    systemStatus: { reload: vi.fn() }
  };
  const modalService = { openError: vi.fn() };

  beforeEach(async () => {
    vi.resetAllMocks();
    loginService.createSystemUser.mockImplementation(() => new Promise<void>((res, rej) => {
      resolveRequest = res;
      rejectRequest = rej;
    }));
    modalService.openError.mockResolvedValue(undefined);

    await TestBed.configureTestingModule({
      imports: [SystemCard],
      providers: [
        { provide: LoginService, useValue: loginService },
        { provide: ModalService, useValue: modalService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SystemCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  const fillValidForm = () => component.model.set({
    username: 'admin', password1: '12345678', password2: '12345678'
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose the validation messages', () => {
    component.model.set({ username: 'ab', password1: '123', password2: '' });

    expect(component.form.username().errors()[0]?.message).toBe('Must have at least 3 characters');
    expect(component.form.password1().errors()[0]?.message).toBe('Must have at least 8 characters');
    expect(component.form.password2().errors()[0]?.message).toBe('This field is required');
  });

  it('should re-validate the confirmation when the main password changes', () => {
    component.model.set({ username: 'admin', password1: '12345678', password2: '12345679' });
    expect(component.form.password2().getError('match')).toBeDefined();

    component.form.password1().value.set('12345679');
    expect(component.form.password2().getError('match')).toBeUndefined();
    expect(component.form().valid()).toBe(true);
  });

  it('should sanitize the username', async () => {
    component.form.username().value.set('Ad min!_-9');
    await fixture.whenStable();
    expect(component.form.username().value()).toBe('admin_-9');
  });

  it('should not call the API when the form is invalid', async () => {
    await submit(component.form);
    expect(loginService.createSystemUser).not.toHaveBeenCalled();
    expect(component.form.username().touched()).toBe(true);
  });

  it('should disable the form while submitting, then reload the status', async () => {
    fillValidForm();
    const done = submit(component.form);

    expect(loginService.createSystemUser).toHaveBeenCalledWith('admin', '12345678');
    expect(component.form().submitting()).toBe(true);
    expect(component.form.username().disabled()).toBe(true);

    resolveRequest();
    await done;

    expect(component.form().submitting()).toBe(false);
    expect(component.form.username().disabled()).toBe(false);
    expect(loginService.systemStatus.reload).toHaveBeenCalledTimes(1);
    expect(modalService.openError).not.toHaveBeenCalled();
  });

  it('should open the error modal when the request fails', async () => {
    fillValidForm();
    const done = submit(component.form);
    const error = new Error('Boom');

    rejectRequest(error);
    await done;

    expect(modalService.openError).toHaveBeenCalledWith(error);
    expect(loginService.systemStatus.reload).toHaveBeenCalledTimes(1);
  });
});
