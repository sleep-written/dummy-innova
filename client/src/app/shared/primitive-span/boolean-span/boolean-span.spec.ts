import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanSpan } from './boolean-span';

describe('BooleanSpan', () => {
  let component: BooleanSpan;
  let fixture: ComponentFixture<BooleanSpan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooleanSpan],
    }).compileComponents();

    fixture = TestBed.createComponent(BooleanSpan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
