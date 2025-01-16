import { TestBed } from '@angular/core/testing';

import { DailyStatisticsService } from './daily-statistics.service';

describe('DailyStatisticsService', () => {
  let service: DailyStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
