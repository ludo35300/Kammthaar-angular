import { TestBed } from '@angular/core/testing';

import { ControllerDataService } from './controller-data.service';
import { provideHttpClient } from '@angular/common/http';

describe('ControllerDataService', () => {
  let service: ControllerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
                    provideHttpClient(),
                  ],
    });
    service = TestBed.inject(ControllerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
