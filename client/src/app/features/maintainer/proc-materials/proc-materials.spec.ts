import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcMaterials } from './proc-materials';

describe('ProcMaterials', () => {
  let component: ProcMaterials;
  let fixture: ComponentFixture<ProcMaterials>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcMaterials],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcMaterials);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
