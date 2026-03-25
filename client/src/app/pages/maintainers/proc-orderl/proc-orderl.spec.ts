import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcOrderl } from './proc-orderl';

describe('ProcOrderl', () => {
  let component: ProcOrderl;
  let fixture: ComponentFixture<ProcOrderl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcOrderl],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcOrderl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
