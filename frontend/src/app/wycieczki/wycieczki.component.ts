import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ocena, Wycieczka } from '../model/wycieczki';
import { WycieczkiService } from '../wycieczki.service';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-wycieczki',
  templateUrl: './wycieczki.component.html',
  styleUrls: ['./wycieczki.component.scss'],
  providers: [],
})
export class WycieczkiComponent implements OnInit {
  zarezerwowaneTotal = 0;

  public displayedWycieczki: Wycieczka[];

  isFetching = false;

  loggedIn = false;

  constructor(private wycieczkiService: WycieczkiService, private authService: AuthService) {
    this.initializeWycieczkiStream();
  }

  anyMoreExpensive = (wycieczka) => this.displayedWycieczki.some((innaWycieczka) => innaWycieczka.cena > wycieczka.cena);

  anyLessExpensive = (wycieczka) => this.displayedWycieczki.some((innaWycieczka) => innaWycieczka.cena < wycieczka.cena);

  isMostExpensive = (wycieczka) => (!this.anyMoreExpensive(wycieczka));

  isCheapest = (wycieczka) => (!this.anyLessExpensive(wycieczka));

  handleRemovePlace = (wycieczka: Wycieczka) => {
    this.wycieczkiService.unBookPlace(wycieczka);
  }

  handleBookPlace = (wycieczka: Wycieczka) => {
    this.wycieczkiService.bookPlace(wycieczka);
  }

  handleRemoveWycieczka = (wycieczka: Wycieczka) => {
    this.wycieczkiService.deleteWycieczka(wycieczka);
  }

  initializeWycieczkiStream = () => {
    this.displayedWycieczki = this.wycieczkiService.filteredWycieczki.filter((wycieczka) => !wycieczka.deleted);
    this.wycieczkiService.filteredWycieczkiStream$.subscribe((filteredWycieczki) => {
      this.displayedWycieczki = filteredWycieczki.filter((wycieczka) => !wycieczka.deleted);
    });
    this.isFetching = this.wycieczkiService.isFetching;
    this.wycieczkiService.isFetchingStream$.subscribe((nextIsFetching) => {
      this.isFetching = nextIsFetching;
    });
    this.loggedIn = this.authService.loggedIn;
    this.authService.loggedInStream$.subscribe((newLoggedIn) => {
      this.loggedIn = newLoggedIn;
    });
  }

  handleRateWycieczka = (wycieczka: Wycieczka, ocena: Omit<Ocena, 'email'>) => {
    this.wycieczkiService.rateWycieczka(wycieczka, ocena);
  }

  ngOnInit(): void {
  }

  canRate(wycieczka: Wycieczka): Observable<boolean> {
    return this.wycieczkiService.canRateWycieczka(wycieczka);
  }

  canRateNow(wycieczka: Wycieczka): boolean {
    return this.wycieczkiService.canRateNow(wycieczka);
  }
}
