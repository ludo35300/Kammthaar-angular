import { TestBed } from '@angular/core/testing';
import { BatterieRealtimeService } from './batterie-realtime.service';
import { provideHttpClient } from '@angular/common/http';

describe('BatterieRealtimeService', () => {
  let service: BatterieRealtimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        BatterieRealtimeService
      ],
    });
    service = TestBed.inject(BatterieRealtimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
