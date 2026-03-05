import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectFilter } from './multiselect-filter';

describe('MultiselectFilter', () => {
  let component: MultiselectFilter;
  let fixture: ComponentFixture<MultiselectFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiselectFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiselectFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
