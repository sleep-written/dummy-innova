import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCompanies } from './base-companies';

describe('BaseCompanies', () => {
  let component: BaseCompanies;
  let fixture: ComponentFixture<BaseCompanies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseCompanies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseCompanies);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
