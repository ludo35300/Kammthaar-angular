import { TestBed } from '@angular/core/testing';

import { PsService } from './ps.service';

describe('PsService', () => {
  let service: PsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
