import { TestBed } from '@angular/core/testing';

import { SolarDataService } from './solar-data.service';
import { provideHttpClient } from '@angular/common/http';

describe('SolarDataService', () => {
  let service: SolarDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
              provideHttpClient(),
      ]
    });
    service = TestBed.inject(SolarDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
