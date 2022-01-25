import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { WycieczkiService } from './wycieczki.service';
import {mockWycieczki, mockRezerwacje, mockFlashDeals, mockOceny} from '../utils/tests-utils/mocks';
import { Wycieczka } from './model/wycieczki';

describe('WycieczkiServiceService', () => {
  let service: WycieczkiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ HttpClientTestingModule ]});
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(WycieczkiService);
  });

  const cleanHttpRequests = () => {
    expect(httpTestingController.expectOne('/trips').request.method).toBe('GET');
    expect(httpTestingController.expectOne('/flash-deals').request.method).toBe('GET');
  };

  const verifyHttpRequests = () => {
    httpTestingController.verify();
  };

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check if flash deal is current and matches when wycieczka is valid ' +
    'and flashdeal current', () => {
    const mockValidWycieczka = mockWycieczki[0];
    const mockFlashDeal = {...mockFlashDeals[0]};
    const startsAt = new Date();
    const expiresAt = new Date();
    startsAt.setDate(startsAt.getDate() - 3);
    expiresAt.setDate(expiresAt.getDate() + 3);
    mockFlashDeal.starts_at = startsAt;
    mockFlashDeal.expires_at = expiresAt;
    // @ts-ignore
    expect(service.isFlashDealCurrentAndMatches(mockValidWycieczka, mockFlashDeal)).toBeTruthy();
  });

  it('should check if flash deal is current and matches when wycieczka is valid ' +
    'and flashdeal is not current', () => {
    const mockValidWycieczka = mockWycieczki[0];
    const mockFlashDeal = {...mockFlashDeals[0]};
    // @ts-ignore
    expect(service.isFlashDealCurrentAndMatches(mockValidWycieczka, mockFlashDeal)).toBeFalsy();
  });

  it('should check if flash deal is current and matches when wycieczka is invalid ' +
    'and flashdeal is not current', () => {
    const mockValidWycieczka = mockWycieczki[0];
    const mockFlashDeal = {...mockFlashDeals[0]};
    mockFlashDeal.wycieczka_id = '123';
    // @ts-ignore
    expect(service.isFlashDealCurrentAndMatches(mockValidWycieczka, mockFlashDeal)).toBeFalsy();
  });

  it('should fetch wycieczki', () => {
    cleanHttpRequests();
    expect(service.wycieczki).toEqual([]);

    service.fetchWycieczki();

    const req = httpTestingController.expectOne('/trips');
    expect(req.request.method).toBe('GET');

    req.flush(mockWycieczki);
    expect(service.wycieczki).toEqual(mockWycieczki);
    expect(service.isFetching).toBeFalsy();
    httpTestingController.verify();
  });

  it('should fetch rezerwacje', () => {
    cleanHttpRequests();
    expect(service.rezerwacje).toEqual([]);

    service.fetchRezerwacje();

    const req = httpTestingController.expectOne('/reservations');
    expect(req.request.method).toBe('GET');

    req.flush(mockRezerwacje);
    expect(service.rezerwacje).toEqual(mockRezerwacje);
    expect(service.isFetching).toBeFalsy();
    verifyHttpRequests();
  });

  it('should fetch flash deals', () => {
    cleanHttpRequests();
    expect(service.flashDeals).toEqual([]);

    service.fetchFlashDeals();

    const req = httpTestingController.expectOne('/flash-deals');
    expect(req.request.method).toBe('GET');

    req.flush(mockFlashDeals);
    expect(service.flashDeals).toEqual(mockFlashDeals);
    expect(service.isFetching).toBeFalsy();
    verifyHttpRequests();
  });

  it('should push flash deal', () => {
    cleanHttpRequests();
    expect(service.flashDeals).toEqual([]);

    const mockFlashDeal = mockFlashDeals[0];
    service.pushFlashDeal(mockFlashDeal);

    const req = httpTestingController.expectOne('/flash-deals/');
    expect(req.request.method).toBe('POST');
    req.flush(mockFlashDeal);

    expect(service.flashDeals[0]).toEqual(mockFlashDeal);
    verifyHttpRequests();
  });

  it('should delete wycieczka', () => {
    // FAILED
    cleanHttpRequests();
    service.wycieczki = mockWycieczki;

    const mockWycieczka = mockWycieczki[0];
    service.deleteWycieczka(mockWycieczka);

    const req = httpTestingController.expectOne(`/trips/${mockWycieczka._id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});

    expect(service.wycieczki).not.toContain(mockWycieczka);
    verifyHttpRequests();
  });

  it('should add wycieczka', () => {
    cleanHttpRequests();
    expect(service.wycieczki).toEqual([]);

    const mockWycieczka = mockWycieczki[0];
    service.addWycieczka(mockWycieczka);

    const req = httpTestingController.expectOne('/trips/');
    expect(req.request.method).toBe('POST');
    req.flush(mockWycieczka);

    expect(service.wycieczki[0]).toEqual(mockWycieczka);
    verifyHttpRequests();
  });

  it('should get wycieczka while in cache', () => {
    service.wycieczki = mockWycieczki;
    const mockWycieczka = mockWycieczki[0];
    let returnedWycieczka = null;

    const onFetched = (wycieczka: Wycieczka) => {
      returnedWycieczka = wycieczka;
      expect(returnedWycieczka).toEqual(mockWycieczka);
    };

    service.getWycieczka(mockWycieczka._id, onFetched);
  });

  it('should get wycieczka while not in cache', () => {
    cleanHttpRequests();
    const mockWycieczka = mockWycieczki[0];
    let returnedWycieczka = null;

    const onFetched = (wycieczka: Wycieczka) => {
      returnedWycieczka = wycieczka;
      expect(returnedWycieczka).toEqual(mockWycieczka);
    };

    service.getWycieczka(mockWycieczka._id, onFetched);

    const req = httpTestingController.expectOne(`/trips/${mockWycieczka._id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockWycieczka);

    verifyHttpRequests();
  });

  it('should can rate now', () => {
    service.rezerwacje = mockRezerwacje;
    const mockWycieczka = mockWycieczki[0];
    expect(service.canRateNow(mockWycieczka)).toBeTruthy();

    service.rezerwacje = [];
    expect(service.canRateNow(mockWycieczka)).toBeFalsy();
  });

  it('should rate wycieczka', () => {
    cleanHttpRequests();
    service.wycieczki = mockWycieczki;
    const mockWycieczka = mockWycieczki[0];
    const mockOcena = mockOceny[0];

    service.rateWycieczka(mockWycieczka, mockOcena);
    const req = httpTestingController.expectOne(`/trips/${mockWycieczka._id}/review`);
    expect(req.request.method).toBe('POST');
    mockWycieczka.oceny = [mockOcena];
    req.flush(mockWycieczka);

    expect(service.wycieczki[0]).toEqual(mockWycieczka);

    verifyHttpRequests();
  });

  it('should book place', () => {
    cleanHttpRequests();
    service.wycieczki = mockWycieczki;
    const mockWycieczka = mockWycieczki[0];
    const mockRezerwacja = mockRezerwacje[0];

    service.bookPlace(mockWycieczka);
    const req = httpTestingController.expectOne(`/trips/${mockWycieczka._id}/booking`);
    expect(req.request.method).toBe('POST');
    req.flush({reservation: mockRezerwacja, trip: mockWycieczka});

    expect(service.rezerwacje).toContain(mockRezerwacja);
    verifyHttpRequests();
  });

  it('should unbook place when response is valid', () => {
    cleanHttpRequests();
    service.wycieczki = mockWycieczki;
    service.rezerwacje = mockRezerwacje;
    const mockWycieczka = mockWycieczki[0];
    const mockRezerwacja = mockRezerwacje[0];

    service.unBookPlace(mockWycieczka);
    const req = httpTestingController.expectOne(`/trips/${mockWycieczka._id}/booking`);
    expect(req.request.method).toBe('DELETE');
    req.flush({reservation: mockRezerwacja, trip: mockWycieczka});

    expect(service.rezerwacje).toContain(mockRezerwacja);
    verifyHttpRequests();
  });

  it('should unbook place when response is invalid', () => {
    cleanHttpRequests();
    service.wycieczki = mockWycieczki;
    service.rezerwacje = mockRezerwacje;
    const mockWycieczka = mockWycieczki[0];
    const mockRezerwacja = mockRezerwacje[0];

    service.unBookPlace(mockWycieczka);
    const req = httpTestingController.expectOne(`/trips/${mockWycieczka._id}/booking`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);

    expect(service.rezerwacje).not.toContain(mockRezerwacja);
    verifyHttpRequests();
  });

  it('should update with wycieczka', () => {
    const mockWycieczka = mockWycieczki[0];
    service.wycieczki = [mockWycieczka];

    mockWycieczka.cena = 569;
    service.updateWithWycieczka(mockWycieczka);
    expect(service.wycieczki[0]).toEqual(mockWycieczka);
  });

  it('should shift rezerwacje', () => {
    const mockRezerwacja = mockRezerwacje[0];
    service.rezerwacje = [mockRezerwacja];

    mockRezerwacja.miejsca = 5;
    service.shiftRezerwacja(mockRezerwacja);
    expect(service.rezerwacje[0]).toEqual(mockRezerwacja);

    const anotherMockRezerwacja = mockRezerwacje[1];
    expect(service.rezerwacje).not.toContain(anotherMockRezerwacja);

    service.shiftRezerwacja(anotherMockRezerwacja);
    expect(service.rezerwacje).toContain(anotherMockRezerwacja);
  });

  it('should unshift rezerwacje', () => {
    const mockRezerwacja = mockRezerwacje[0];
    service.rezerwacje = [mockRezerwacja];

    mockRezerwacja.miejsca = 2;
    service.unshiftRezerwacja(mockRezerwacja);
    expect(service.rezerwacje[0]).toEqual(mockRezerwacja);
  });

  it('should filter rezerwacje by wycieczka', () => {
    service.rezerwacje = mockRezerwacje;
    const mockWycieczka = mockWycieczki[0];
    const mockRezerwacja = mockRezerwacje.find(({_id}) => _id === mockWycieczka._id);
    service.filterRezerwacjeByWycieczka(mockWycieczka);

    expect(service.rezerwacje).not.toContain(mockRezerwacja);
  });
});

