import { TestBed } from '@angular/core/testing';

import { InMemoryWycieczkiService } from './in-memory-wycieczki.service';

describe('InMemoryWycieczkiService', () => {
  let service: InMemoryWycieczkiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryWycieczkiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
