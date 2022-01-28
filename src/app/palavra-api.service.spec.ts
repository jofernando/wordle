import { TestBed } from '@angular/core/testing';

import { PalavraApiService } from './palavra-api.service';

describe('PalavraApiService', () => {
  let service: PalavraApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PalavraApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
