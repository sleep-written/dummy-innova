import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContent } from './modal-content';

describe('ModalContent', () => {
  let component: ModalContent<unknown>;
  let fixture: ComponentFixture<ModalContent<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
