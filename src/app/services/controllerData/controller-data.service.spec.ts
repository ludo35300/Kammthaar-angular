import { TestBed } from '@angular/core/testing';

import { ControllerDataService } from './controller-data.service';

describe('ControllerDataService', () => {
  let service: ControllerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControllerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
