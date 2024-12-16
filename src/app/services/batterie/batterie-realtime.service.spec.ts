import { TestBed } from '@angular/core/testing';

import { BatterieRealtimeService } from './batterie-realtime.service';

describe('BatterieRealtimeService', () => {
  let service: BatterieRealtimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatterieRealtimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
