import { TestBed } from '@angular/core/testing';

import { DischargingEquipmentStatusService } from './discharging-equipment-status.service';

describe('DischargingEquipmentStatusService', () => {
  let service: DischargingEquipmentStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DischargingEquipmentStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
