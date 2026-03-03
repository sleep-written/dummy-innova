import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcLayouts } from './proc-layouts';

describe('ProcLayouts', () => {
  let component: ProcLayouts;
  let fixture: ComponentFixture<ProcLayouts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcLayouts],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcLayouts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
