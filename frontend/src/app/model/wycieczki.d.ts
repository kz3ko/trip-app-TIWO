export interface Ocena {
  gwiazdki: 0 | 1 | 2 | 3 | 4 | 5;
  komentarz: string;
  username?: string;
}

export interface Wycieczka {
  _id: string;
  nazwa: string;
  docelowyKraj: string;
  dataRozpoczecia: Date;
  dataZakonczenia: Date;
  cena: number;
  maxMiejsc: number;
  opis: string;
  zdjecie: string;
  galeria: string[];
  rezerwowane: number;
  oceny: Ocena[];
  deleted?: boolean;
}

export interface FlashDeal {
  _id: string;
  wycieczka_id: string;
  expires_at: Date;
  starts_at: Date;
  discount: number;
}
