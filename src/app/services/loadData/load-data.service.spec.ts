import { TestBed } from '@angular/core/testing';

import { LoadDataService } from './load-data.service';
import { provideHttpClient } from '@angular/common/http';

describe('LoadDataService', () => {
  let service: LoadDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
            provideHttpClient(),
          ],});
    service = TestBed.inject(LoadDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
