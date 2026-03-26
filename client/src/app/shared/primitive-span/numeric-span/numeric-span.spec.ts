import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericSpan } from './numeric-span';

describe('NumericSpan', () => {
  let component: NumericSpan;
  let fixture: ComponentFixture<NumericSpan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NumericSpan],
    }).compileComponents();

    fixture = TestBed.createComponent(NumericSpan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
