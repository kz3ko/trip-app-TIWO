import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import firebase from 'firebase';
import { environment } from '../environments/environment';
import Auth = firebase.auth.Auth;

export interface Credentials {
  email: string;
  password: string;
}

export type AccessLevel = 'admin' | 'regular';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedInSource = new Subject<boolean>(); // Logged in subject

  loggedInStream$ = this.loggedInSource.asObservable(); // Logged in stream

  loggedIn = false;

  accessLevel: AccessLevel[] = [];

  private accessLevelsSource = new Subject<AccessLevel[]>(); // access levels in subject

  accessLevelsStream$ = this.accessLevelsSource.asObservable(); // access levels in stream

  constructor(private http: HttpClient) {
    this.loggedIn = this.getLoggedIn();
    this.loggedInSource.next(this.loggedIn);
    this.accessLevel = AuthService.getAccessLevel();
    this.accessLevelsSource.next(this.accessLevel);
  }

  static getAccessLevel(): AccessLevel[] {
    console.log(AuthService.getCookie('adminAccess'));
    if (AuthService.getCookie('adminAccess') === 'true') {
      return ['admin'];
    }
    return ['regular'];
  }

  static getApiToken(): string | null {
    return AuthService.getCookie('authToken') || null;
  }

  static getCookie(name: string): string {
    const ca: Array<string> = document.cookie.split(';');
    const cookieName = `${name}=`;
    let c: string;
    let value = '';
    ca.forEach((elem) => {
      c = elem.replace(/^\s+/g, '');
      if (c.indexOf(cookieName) === 0) {
        value = c.substring(cookieName.length, c.length);
      }
    });
    return value;
  }

  static deleteCookie(name): void {
    this.setCookie(name, '', -1);
  }

  static setCookie(name: string, value: string, expireDays: number, path: string = ''): void {
    const d = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    const cpath = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }

  getLoggedIn = (): boolean => !!AuthService.getApiToken();

  login = (credentials: Credentials): Observable<any> => this.http.post(
    '/accounts/login', credentials,
  ).pipe(
    tap(() => {
      this.accessLevel = AuthService.getAccessLevel();
      this.accessLevelsSource.next(this.accessLevel);
      this.loggedInSource.next(true);
      this.loggedIn = true;
    }),
    catchError((err) => {
      this.loggedIn = false;
      throw err;
    }),
  )

  register = (credentials: Credentials) => this.http.post('/accounts/register', credentials);

  logout = () => {
    AuthService.deleteCookie('authToken');
    AuthService.deleteCookie('adminAccess');
    this.accessLevel = AuthService.getAccessLevel();
    this.accessLevelsSource.next(this.accessLevel);
    this.loggedInSource.next(false);
    this.loggedIn = false;
  }
}
