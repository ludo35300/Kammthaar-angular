import { TestBed } from '@angular/core/testing';

import { BatterieStatusService } from './batterie-status.service';
import { provideHttpClient } from '@angular/common/http';

describe('BatterieStatusService', () => {
  let service: BatterieStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        BatterieStatusService
      ],
    });
    service = TestBed.inject(BatterieStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
