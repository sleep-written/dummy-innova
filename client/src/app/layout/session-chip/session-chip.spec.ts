import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionChip } from './session-chip';

describe('SessionChip', () => {
  let component: SessionChip;
  let fixture: ComponentFixture<SessionChip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionChip],
    }).compileComponents();

    fixture = TestBed.createComponent(SessionChip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
