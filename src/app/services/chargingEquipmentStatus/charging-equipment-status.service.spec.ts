import { TestBed } from '@angular/core/testing';

import { ChargingEquipmentStatusService } from './charging-equipment-status.service';

describe('ChargingEquipmentStatusService', () => {
  let service: ChargingEquipmentStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChargingEquipmentStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
