import { TestBed } from '@angular/core/testing';
import { SessionChipService } from './session-chip.service';

describe('SessionChipService', () => {
  let service: SessionChipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionChipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
