import { TestBed } from '@angular/core/testing';

import { ServeurService } from './serveur.service';
import { provideHttpClient } from '@angular/common/http';

describe('ServeurService', () => {
  let service: ServeurService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        ServeurService
      ],
    });
    service = TestBed.inject(ServeurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
