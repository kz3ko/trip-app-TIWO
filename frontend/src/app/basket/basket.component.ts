import {
  Component, Input, OnInit, Renderer2,
} from '@angular/core';
import { WycieczkiService } from '../wycieczki.service';
import { FlashDeal, Wycieczka } from '../model/wycieczki';
import { Rezerwacja } from '../model/rezerwacje';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  wycieczki: Wycieczka[];

  bookings: Rezerwacja[];

  flashDeals: FlashDeal[];

  bookingsWithWycieczkas: { booking: Rezerwacja, wycieczka: Wycieczka, flashDeal?: FlashDeal }[];

  basketClosed = true;

  @Input() zalogowany: boolean;

  constructor(private wycieczkiService: WycieczkiService, private renderer: Renderer2) {
    this.initializeWycieczkiStream();
  }

  ngOnInit(): void {
    this.bodyScrollUpdate();
  }

  initializeWycieczkiStream = () => {
    this.bookings = this.wycieczkiService.rezerwacje;
    this.wycieczki = this.wycieczkiService.wycieczki;
    this.flashDeals = this.wycieczkiService.flashDeals;
    this.updateBookingsWithWycieczkasAndFlashDeals();

    this.wycieczkiService.rezerwacjeStream$.subscribe((rezerwacje) => {
      this.bookings = rezerwacje;
      this.updateBookingsWithWycieczkasAndFlashDeals();
    });
    this.wycieczkiService.wycieczkiStream$.subscribe((wycieczki) => {
      this.wycieczki = wycieczki;
      this.updateBookingsWithWycieczkasAndFlashDeals();
    });

    this.wycieczkiService.currentFlashDealsStream$.subscribe((flashDeals) => {
      this.flashDeals = flashDeals;
      this.updateBookingsWithWycieczkasAndFlashDeals();
    });
  }

  toggleBasket = () => {
    this.basketClosed = !this.basketClosed;
    this.bodyScrollUpdate();
  }

  bodyScrollUpdate = () => {
    if (this.basketClosed) {
      this.renderer.removeClass(document.body, 'ovh');
    } else {
      this.renderer.addClass(document.body, 'ovh');
    }
  }

  private updateBookingsWithWycieczkasAndFlashDeals = () => {
    this.bookingsWithWycieczkas = this.bookings.map(
      (booking) => {
        const wycieczka = this.wycieczki.find((v) => v._id === booking.wycieczka_id);
        const flashDeal = this.flashDeals.find((fd) => fd.wycieczka_id === wycieczka._id);
        return {
          booking, wycieczka, flashDeal,
        };
      },
    ).filter(({ wycieczka }) => !wycieczka.deleted);
  }

  totalRezerwowane = () => this.bookingsWithWycieczkas
    .reduce(
      (val, { booking, wycieczka, flashDeal }) => (val + (booking.miejsca * (wycieczka.cena - (flashDeal ? flashDeal.discount : 0)))),
      0,
    )
}
