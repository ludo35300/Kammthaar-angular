import { TestBed } from '@angular/core/testing';

import { EnergyStatisticsService } from './energy-statistics.service';
import { provideHttpClient } from '@angular/common/http';

describe('EnergyStatisticsService', () => {
  let service: EnergyStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
              provideHttpClient(),
            ],
    });
    service = TestBed.inject(EnergyStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
