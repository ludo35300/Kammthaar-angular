import { TestBed } from '@angular/core/testing';

import { SolarDataService } from './solar-data.service';

describe('SolarDataService', () => {
  let service: SolarDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolarDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
