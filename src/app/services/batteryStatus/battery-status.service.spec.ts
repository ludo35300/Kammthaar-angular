import { TestBed } from '@angular/core/testing';

import { BatteryStatusService } from './battery-status.service';

describe('BatteryStatusService', () => {
  let service: BatteryStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatteryStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
