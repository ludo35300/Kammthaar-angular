import { TestBed } from '@angular/core/testing';

import { BatteryStatusService } from './battery-status.service';
import { provideHttpClient } from '@angular/common/http';

describe('BatteryStatusService', () => {
  let service: BatteryStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
              provideHttpClient(),
      ]
    });
    service = TestBed.inject(BatteryStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
