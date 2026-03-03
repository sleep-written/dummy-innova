import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetDialog } from './target-dialog';

describe('TargetDialog', () => {
  let component: TargetDialog;
  let fixture: ComponentFixture<TargetDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TargetDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TargetDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
