import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { io } from 'socket.io-client';
import { map } from 'rxjs/operators';
import { FlashDeal, Ocena, Wycieczka } from './model/wycieczki';
import { FilterFunction, FiltersProviderService } from './filters-provider.service';
import { AuthService } from './auth-service.service';
import { Rezerwacja } from './model/rezerwacje';
import { environment } from '../environments/environment';

type BookingResponse = { trip: Wycieczka, reservation: Rezerwacja };

@Injectable()
export class WycieczkiService {
  // Reservations
  public rezerwacje: Rezerwacja[] = [];

  private rezerwacjeSource = new Subject<Rezerwacja[]>(); // Rezerwacje subject

  rezerwacjeStream$ = this.rezerwacjeSource.asObservable(); // Rezerwacje stream

  constructor(
    private filtersService: FiltersProviderService,
    private authService: AuthService,
    private http: HttpClient,
  ) {
    this.fetchWycieczki();
    if (authService.loggedIn) {
      this.fetchRezerwacje();
    }
    this.fetchFlashDeals();

    filtersService.filterStream$.subscribe(this.updateFilteredWycieczki);
    authService.loggedInStream$.subscribe((newLoggedIn) => {
      if (!newLoggedIn) {
        this.rezerwacje = [];
        this.rezerwacjeSource.next(this.rezerwacje);
      } else {
        this.fetchRezerwacje();
      }
    });
    this.listenForUpdates();
  }

  // Fetching
  private isFetchingStore = false;

  set isFetching(value: boolean) {
    this.isFetchingStore = value;

    this.isFetchingSource.next(value);
  }

  get isFetching(): boolean {
    return this.isFetchingStore;
  }

  public isFetchingSource = new Subject<boolean>();

  public isFetchingStream$ = this.isFetchingSource.asObservable();

  // Wycieczki

  public filteredWycieczki: Wycieczka[] = [];

  private wycieczkiSource = new Subject<Wycieczka[]>(); // Wycieczki subject

  wycieczkiStream$ = this.wycieczkiSource.asObservable(); // Wycieczki stream

  private filteredWycieczkiSource = new Subject<Wycieczka[]>(); // Filtered Wycieczki subject

  filteredWycieczkiStream$ = this.filteredWycieczkiSource.asObservable(); // Filtered Wycieczki stream

  private wycieczkiStore: Wycieczka[] = [];

  get wycieczki(): Wycieczka[] {
    return this.wycieczkiStore;
  }

  set wycieczki(newValue: Wycieczka[]) {
    this.wycieczkiStore = newValue;
    this.wycieczkiSource.next(this.wycieczkiStore);
    this.updateFilteredWycieczki();
  }

  // Flash Deals

  private flashDealSource = new Subject<FlashDeal[]>();

  private flashDealStore: FlashDeal[] = [];

  currentFlashDealsStream$ = this.flashDealSource.asObservable().pipe(
    map((flashDeals) => (flashDeals as FlashDeal[])
      .filter((flashDeal) => this.isFlashDealCurrent(flashDeal))),
  );

  private isFlashDealCurrent = (flashDeal: FlashDeal): boolean => {
    const now = new Date();
    const startDate = new Date(flashDeal.starts_at);
    const endDate = new Date(flashDeal.expires_at);
    return endDate >= now && now >= startDate;
  }

  private isFlashDealCurrentAndMatches = (wycieczka: Wycieczka, flashDeal: FlashDeal): boolean => {
    if (flashDeal.wycieczka_id === wycieczka._id) {
      return this.isFlashDealCurrent(flashDeal);
    }
    return false;
  }

  flashDealsForWycieczkaStream$ = (wycieczka: Wycieczka) => this.flashDealSource.asObservable().pipe(
    map((flashDeals) => (flashDeals as FlashDeal[])
      .filter((flashDeal) => this.isFlashDealCurrentAndMatches(wycieczka, flashDeal))),
  )

  get flashDeals(): FlashDeal[] {
    return this.flashDealStore;
  }

  set flashDeals(flashDeals: FlashDeal[]) {
    this.flashDealStore = flashDeals;
    this.flashDealSource.next(flashDeals);
  }

  updateFilteredWycieczki = (filters?: FilterFunction[]) => {
    const filteredWycieczki = this.applyFilters(filters || []);
    this.filteredWycieczki = filteredWycieczki;
    this.filteredWycieczkiSource.next(filteredWycieczki);
  }

  applyFilters = (filters: FilterFunction[]) => {
    let filteredWycieczki = this.wycieczki;
    filters.forEach((fltr) => {
      filteredWycieczki = fltr(filteredWycieczki);
    });
    return filteredWycieczki;
  }

  // API
  fetchWycieczki = (onFetch?: (newWycieczki: Wycieczka[]) => void) => {
    this.isFetching = true;
    this.http.get<Wycieczka[]>('/trips').subscribe((wycieczki) => {
      this.wycieczki = wycieczki;
      this.isFetching = false;
      if (onFetch) { onFetch(this.wycieczki); }
    });
  }

  fetchRezerwacje = () => {
    this.isFetching = true;
    this.http.get<Rezerwacja[]>('/reservations').subscribe((rezerwacje) => {
      this.rezerwacje = rezerwacje;
      this.rezerwacjeSource.next(rezerwacje);
      this.isFetching = false;
    });
  }

  fetchFlashDeals = () => {
    this.isFetching = true;
    this.http.get<FlashDeal[]>('/flash-deals').subscribe((flashDeals) => {
      this.flashDeals = flashDeals;
      this.flashDealSource.next(flashDeals);
      this.isFetching = false;
    });
  }

  pushFlashDeal(flashDealData: Omit<FlashDeal, '_id'>): void {
    this.http.post<FlashDeal>('/flash-deals/', flashDealData).subscribe((val) => {
      this.flashDeals = [...this.flashDeals, val];
    });
  }

  deleteWycieczka = (wycieczkaToDelete: Wycieczka) => {
    this.isFetching = true;
    this.http.delete(`/trips/${wycieczkaToDelete._id}`).subscribe((val) => {
      this.wycieczki = this.wycieczki.filter(({ _id }) => _id === wycieczkaToDelete._id);
      this.isFetching = false;
    });
  }

  addWycieczka = (wycieczka: Wycieczka) => {
    this.http.post<Wycieczka>('/trips/', wycieczka).subscribe((val) => {
      this.wycieczki = [...this.wycieczki, val];
    });
  }

  updateWycieczka = (wycieczkaToUpdate: Wycieczka) => {
    this.http.put<Wycieczka>(`/trips/${wycieczkaToUpdate._id}`, wycieczkaToUpdate).subscribe((val) => {
      this.wycieczki = this.wycieczki.map(
        (wycieczka) => (wycieczkaToUpdate._id === wycieczka._id ? val : wycieczka),
      );
    });
  }

  getWycieczka = (id: string, onFetched: (wycieczka: Wycieczka) => void): Wycieczka => {
    const findInCache = this.wycieczki.find(({ _id }) => id === _id);
    if (findInCache) {
      onFetched(findInCache);
      return;
    }
    this.http.get<Wycieczka>(`/trips/${id}`).subscribe((val) => {
      this.wycieczki = [...this.wycieczki, val];
      onFetched(val);
    });
  }

  canRateWycieczka = (wycieczka: Wycieczka): Observable<boolean> => this.rezerwacjeStream$.pipe(
    map((rezerwacje) => rezerwacje.some((rezerwacja) => rezerwacja.wycieczka_id === wycieczka._id)),
  )

  canRateNow = (wycieczka: Wycieczka): boolean => this.rezerwacje
    .some((rezerwacja) => rezerwacja.wycieczka_id === wycieczka._id)

  rateWycieczka = (
    ratingWycieczka: Wycieczka, ocena: Omit<Ocena, 'username'>,
  ) => this.http.post<Wycieczka>(`/trips/${ratingWycieczka._id}/review`, {
    comment: ocena.komentarz,
    rating: ocena.gwiazdki,
  })
    .subscribe((ratedWycieczka) => {
      this.wycieczki = this.wycieczki.map(
        (wycieczka) => (wycieczka._id === ratingWycieczka._id
          ? { ...wycieczka, oceny: ratedWycieczka.oceny }
          : wycieczka),
      );
    })

  bookPlace = (bookedWycieczka: Wycieczka) => this.http.post<BookingResponse>(
    `/trips/${bookedWycieczka._id}/booking`, {},
  ).subscribe(({ reservation, trip }) => {
    this.updateWithWycieczka(trip);
    this.shiftRezerwacja(reservation);
  })

  unBookPlace = (unBookedWycieczka: Wycieczka) => this.http.delete<BookingResponse | null>(
    `/trips/${unBookedWycieczka._id}/booking`, {},
  )
    .subscribe((response) => {
      if (response) {
        const { reservation, trip } = response;
        this.updateWithWycieczka(trip);
        this.unshiftRezerwacja(reservation);
      } else {
        this.filterRezerwacjeByWycieczka(unBookedWycieczka);
      }
    })

  updateWithWycieczka = (newWycieczka: Wycieczka) => {
    this.wycieczki = this.wycieczki.map(
      (wycieczka) => (wycieczka._id === newWycieczka._id
        ? newWycieczka
        : wycieczka),
    );
  }

  shiftRezerwacja = (newRezerwacja: Rezerwacja) => {
    this.rezerwacje = this.rezerwacje.map(
      (rezerwacja) => (rezerwacja._id === newRezerwacja._id
        ? newRezerwacja
        : rezerwacja),
    );
    if (!this.rezerwacje.includes(newRezerwacja)) { // There must be an instance of this object as a result of the function
      this.rezerwacje.push(newRezerwacja);
    }
    this.rezerwacjeSource.next(this.rezerwacje);
  }

  unshiftRezerwacja = (newRezerwacja: Rezerwacja) => {
    this.rezerwacje = this.rezerwacje.map(
      (rezerwacja) => (rezerwacja._id === newRezerwacja._id
        ? newRezerwacja
        : rezerwacja),
    );
    this.rezerwacjeSource.next(this.rezerwacje);
  }

  filterRezerwacjeByWycieczka = (wycieczka: Wycieczka) => {
    this.rezerwacje = this.rezerwacje.filter((rezerwacja) => (rezerwacja.wycieczka_id !== wycieczka._id));
    this.rezerwacjeSource.next(this.rezerwacje);
  }

  private listenForUpdates = () => {
    const socket = io(environment.baseUrl);
    socket.on('wycieczkiUpdate', () => {
      this.fetchWycieczki();
    });
    socket.on('rezerwacjeUpdate', () => {
      this.fetchRezerwacje();
    });
    socket.on('flashDealsUpdate', () => {
      this.fetchFlashDeals();
    });
  }
}
