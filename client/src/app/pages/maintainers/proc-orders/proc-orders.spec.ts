import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcOrders } from './proc-orders';

describe('ProcOrders', () => {
  let component: ProcOrders;
  let fixture: ComponentFixture<ProcOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcOrders],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcOrders);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
