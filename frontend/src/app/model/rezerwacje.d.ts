import firebase from 'firebase';
import { Wycieczka } from './wycieczki';
import User = firebase.User;

export interface Rezerwacja {
  _id: string;
  wycieczka_id: string;
  username: string;
  miejsca: number;
}
