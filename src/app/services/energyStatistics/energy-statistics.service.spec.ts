import { TestBed } from '@angular/core/testing';

import { EnergyStatisticsService } from './energy-statistics.service';

describe('EnergyStatisticsService', () => {
  let service: EnergyStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnergyStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
