import { Wycieczka } from './wycieczki';

const defaultData = {
  rezerwowane: 0,
  oceny: [],
  galeria: [],
};

export const ensureSchema = (wycieczka: any): Wycieczka => (
  {
    ...defaultData,
    ...wycieczka,
    dataRozpoczecia: new Date(wycieczka.dataRozpoczecia),
    dataZakonczenia: new Date(wycieczka.dataZakonczenia),
  }
);

