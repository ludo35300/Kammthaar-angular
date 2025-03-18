import { TestBed } from '@angular/core/testing';

import { ChargingEquipmentStatusService } from './charging-equipment-status.service';
import { provideHttpClient } from '@angular/common/http';

describe('ChargingEquipmentStatusService', () => {
  let service: ChargingEquipmentStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
                    provideHttpClient(),
      ]
    });
    service = TestBed.inject(ChargingEquipmentStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
