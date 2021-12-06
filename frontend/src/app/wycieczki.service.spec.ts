import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { WycieczkiService } from './wycieczki.service';

describe('WycieczkiServiceService', () => {
  let service: WycieczkiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(WycieczkiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

