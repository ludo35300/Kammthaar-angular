import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { PsService } from './ps.service';

describe('PsService', () => {
  let service: PsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      
      providers: [
        provideHttpClient(),
        PsService
      ],
    });
    service = TestBed.inject(PsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
