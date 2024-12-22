import { TestBed } from '@angular/core/testing';

import { BatterieParametresService } from './batterie-parametres.service';
import { provideHttpClient } from '@angular/common/http';

describe('BatterieParametresService', () => {
  let service: BatterieParametresService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        BatterieParametresService
      ],
    });
    service = TestBed.inject(BatterieParametresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
