import {
  Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy,
} from '@angular/core';
import { Observable } from 'rxjs';
import { FlashDeal, Ocena, Wycieczka } from '../model/wycieczki';
import { WycieczkiService } from '../wycieczki.service';
import { Rezerwacja } from '../model/rezerwacje';

@Component({
  selector: 'app-wycieczka',
  templateUrl: './wycieczka.component.html',
  styleUrls: ['./wycieczka.component.scss'],
})
export class WycieczkaComponent implements OnInit, OnDestroy {
  @Input() wycieczka: Wycieczka;

  @Input() isAdminView?: boolean;

  @Input() isRegistered = false;

  @Input() canRateObservable: Observable<boolean>;

  @Input() canRateBoolean: boolean;

  @Output() bookPlace = new EventEmitter<Wycieczka>();

  @Output() removePlace = new EventEmitter<Wycieczka>();

  @Output() rateWycieczka = new EventEmitter<Omit<Ocena, 'email'>>();

  @Output() removeWycieczka = new EventEmitter<Wycieczka>();

  @Output() editWycieczka = new EventEmitter<Wycieczka>();

  commentsVisible = false;

  rezerwacjaForThisWycieczka: Rezerwacja | undefined;

  flashDealsForThisWycieczka: FlashDeal[] = [];

  activeFlashDeal?: FlashDeal;

  flashDealUpdateInterval: any;

  constructor(private wycieczkiService: WycieczkiService) {
    wycieczkiService.rezerwacjeStream$.subscribe((newRezerwacje) => {
      this.findMatchingReservation(newRezerwacje);
    });
  }

  ngOnInit(): void {
    this.findMatchingReservation(this.wycieczkiService.rezerwacje);
    this.wycieczkiService.flashDealsForWycieczkaStream$(this.wycieczka).subscribe((newFlashDeals) => {
      this.flashDealsForThisWycieczka = newFlashDeals;
      this.activeFlashDeal = this.flashDealsForThisWycieczka.find((flashDeal) => new Date(flashDeal.expires_at) > new Date());
    });

    this.flashDealUpdateInterval = setInterval(() => {
      // Update every second or so
      const previousActiveFlashDeal = !!(this.activeFlashDeal);
      this.activeFlashDeal = this.flashDealsForThisWycieczka.find(
        (flashDeal) => (new Date(flashDeal.expires_at) > new Date()),
      );
      // This basically means that it has expired
      if (this.activeFlashDeal === undefined && previousActiveFlashDeal) {
        this.wycieczkiService.fetchFlashDeals();
      }
    }, 1500);
  }

  ngOnDestroy(): void {
    clearInterval(this.flashDealUpdateInterval);
  }

  removeOne = (wycieczka) => {
    if (wycieczka.rezerwowane) {
      this.removePlace.emit(wycieczka);
    }
  }

  addOne = (wycieczka) => {
    if (wycieczka.rezerwowane < wycieczka.maxMiejsc) {
      this.bookPlace.emit(wycieczka);
    }
  }

  removeSelf = () => this.removeWycieczka.emit(this.wycieczka);

  onRateWycieczka = (ocena: Omit<Ocena, 'email'>) => {
    this.rateWycieczka.emit(ocena);
  }

  toggleComments = () => {
    this.commentsVisible = !this.commentsVisible;
  }

  onEditWycieczka = () => this.editWycieczka.emit(this.wycieczka);

  private findMatchingReservation(reservations: Rezerwacja[]): void {
    this.rezerwacjaForThisWycieczka = reservations.find((rezerwacja) => rezerwacja.wycieczka_id === this.wycieczka._id);
  }
}
