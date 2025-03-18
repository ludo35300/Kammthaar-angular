import { TestBed } from '@angular/core/testing';

import { DailyStatisticsService } from './daily-statistics.service';
import { provideHttpClient } from '@angular/common/http';

describe('DailyStatisticsService', () => {
  let service: DailyStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
                    provideHttpClient(),
                  ],
    });
    service = TestBed.inject(DailyStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
