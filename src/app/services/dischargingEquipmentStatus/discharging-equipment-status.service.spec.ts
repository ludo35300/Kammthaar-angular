import { TestBed } from '@angular/core/testing';

import { DischargingEquipmentStatusService } from './discharging-equipment-status.service';
import { provideHttpClient } from '@angular/common/http';

describe('DischargingEquipmentStatusService', () => {
  let service: DischargingEquipmentStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
                    provideHttpClient(),
                  ],
    });
    service = TestBed.inject(DischargingEquipmentStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
