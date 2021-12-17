import {FlashDeal, Ocena, Wycieczka} from '../../app/model/wycieczki';
import {Rezerwacja} from '../../app/model/rezerwacje';

export const mockOceny: Ocena[] = [
  {gwiazdki: 3, komentarz: 'Calkiem ok.'},
  {gwiazdki: 5, komentarz: 'Rewelacja!'},
];

export const mockWycieczki: Wycieczka[] = [
  {
    _id: '1',
    nazwa: 'Bieszczady',
    docelowyKraj: 'Polska',
    dataRozpoczecia: new Date(),
    dataZakonczenia: new Date(),
    cena: 999,
    maxMiejsc: 3,
    opis: 'Bieszcady',
    zdjecie: 'photo.png',
    galeria: ['photo1.png', 'photo2.png'],
    rezerwowane: 1,
    oceny: mockOceny,
    deleted: false,
  }, {
    _id: '2',
    nazwa: 'Morze bałtyckie',
    docelowyKraj: 'Polska',
    dataRozpoczecia: new Date(),
    dataZakonczenia: new Date(),
    cena: 1999,
    maxMiejsc: 5,
    opis: 'Władysławowo',
    zdjecie: 'photo.png',
    galeria: ['photo1.png', 'photo2.png'],
    rezerwowane: 1,
    oceny: mockOceny,
    deleted: false,
  }
];

export const mockRezerwacje: Rezerwacja[] = [
  {_id: '1', wycieczka_id: '1', username: 'Mikolaj', miejsca: 3},
  {_id: '2', wycieczka_id: '2', username: 'Andrzej', miejsca: 2 }
];

export const mockFlashDeals: FlashDeal[] = [
  {_id: '1', wycieczka_id: '1', expires_at: new Date(), starts_at: new Date(), discount: 20},
  {_id: '2', wycieczka_id: '3', expires_at: new Date(), starts_at: new Date(), discount: 10}
];