import { TestBed } from '@angular/core/testing';

import { BatterieStatusService } from './batterie-status.service';

describe('BatterieStatusService', () => {
  let service: BatterieStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatterieStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
