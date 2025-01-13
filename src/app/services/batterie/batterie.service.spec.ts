import { TestBed } from '@angular/core/testing';
import { BatterieService } from './batterie.service';
import { provideHttpClient } from '@angular/common/http';

describe('BatterieRealtimeService', () => {
  let service: BatterieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        BatterieService
      ],
    });
    service = TestBed.inject(BatterieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
