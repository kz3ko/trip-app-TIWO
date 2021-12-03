import { TestBed } from '@angular/core/testing';

import { FiltersProviderService } from './filters-provider.service';

describe('FiltersProviderService', () => {
  let service: FiltersProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltersProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
