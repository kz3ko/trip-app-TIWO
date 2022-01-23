import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService, Credentials } from './auth-service.service';
import firebase from "firebase";
import Auth = firebase.auth.Auth;

describe('AuthServiceService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  const credentials: Credentials = { email: 'email@gmail.com', password: 'password'};

  const verifyHttpRequests = () => {
    httpTestingController.verify();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register', () => {
    service.register(credentials).subscribe((value => {
      expect(value).toBe(credentials);
    }));
    const req = httpTestingController.expectOne('/accounts/register');
    expect(req.request.method).toBe('POST');
    verifyHttpRequests();
  });

  it('should allow to get access level', () => {
    expect(AuthService.getAccessLevel()).toEqual(['regular']);

    spyOn(AuthService, 'getCookie').and.returnValue('true');
    expect(AuthService.getAccessLevel()).toEqual(['admin']);
  });

  it('should return api token', () => {
    const exampleToken = 'exampleTokenValue';
    expect(AuthService.getApiToken()).toBeNull();
    spyOn(AuthService, 'getCookie').and.returnValue(exampleToken);

    expect(AuthService.getApiToken()).toEqual(exampleToken);
  });

  // it('should set cookie', () => {
  //   const name = 'someToken';
  //   const value = 'someValue';
  //   const expireDays = 23;
  //   const path = 'somePath';
  //
  //   AuthService.setCookie(name, value, expireDays, path);
  //
  //   expect(document.cookie).toEqual('test');
  // });

  it('should allow to get logged in when user gets token', () => {
    spyOn(AuthService, 'getApiToken').and.returnValue('someToken');
    expect(service.getLoggedIn()).toBeTruthy();
  });

  it('should not allow to get logged in when user does not get token', () => {
    spyOn(AuthService, 'getApiToken').and.returnValue('');
    expect(service.getLoggedIn()).toBeFalsy();
  });
});
