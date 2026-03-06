import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcMaterialc } from './proc-materialc';

describe('ProcMaterialc', () => {
  let component: ProcMaterialc;
  let fixture: ComponentFixture<ProcMaterialc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcMaterialc],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcMaterialc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
