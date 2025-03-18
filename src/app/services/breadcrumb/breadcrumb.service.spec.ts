import { TestBed } from '@angular/core/testing';

import { BreadcrumbService } from './breadcrumb.service';
import { provideHttpClient } from '@angular/common/http';

describe('BreadcrumbService', () => {
  let service: BreadcrumbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
                          provideHttpClient(),
            ]
    });
    service = TestBed.inject(BreadcrumbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
