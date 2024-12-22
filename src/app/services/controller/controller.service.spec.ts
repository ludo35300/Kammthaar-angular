import { TestBed } from '@angular/core/testing';

import { ControllerService } from './controller.service';
import { provideHttpClient } from '@angular/common/http';

describe('ControllerService', () => {
  let service: ControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        ControllerService
      ],
    });
    service = TestBed.inject(ControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
