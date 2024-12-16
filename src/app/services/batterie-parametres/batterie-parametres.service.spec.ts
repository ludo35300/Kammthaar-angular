import { TestBed } from '@angular/core/testing';

import { BatterieParametresService } from './batterie-parametres.service';

describe('BatterieParametresService', () => {
  let service: BatterieParametresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatterieParametresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
