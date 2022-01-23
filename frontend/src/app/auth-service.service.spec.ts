import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService, Credentials } from './auth-service.service';

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

  it('should return cookie', () => {
    AuthService.setCookie('validCookieName', 'exampleCookieValue', 120);

    expect(AuthService.getCookie('invalidCookieName')).toEqual('');
    expect(AuthService.getCookie('validCookieName')).toEqual('exampleCookieValue');
  });

  it('should allow to get logged in when user gets token', () => {
    spyOn(AuthService, 'getApiToken').and.returnValue('someToken');
    expect(service.getLoggedIn()).toBeTruthy();
  });

  it('should not allow to get logged in when user does not get token', () => {
    spyOn(AuthService, 'getApiToken').and.returnValue('');
    expect(service.getLoggedIn()).toBeFalsy();
  });

  it('should login', () => {
    service.login(credentials).subscribe((value => {
      expect(value).toBe(credentials);
    }));
    const req = httpTestingController.expectOne('/accounts/login');
    expect(req.request.method).toBe('POST');
    verifyHttpRequests();
  });

  it('should register', () => {
    service.register(credentials).subscribe((value => {
      expect(value).toBe(credentials);
    }));
    const req = httpTestingController.expectOne('/accounts/register');
    expect(req.request.method).toBe('POST');
    verifyHttpRequests();
  });


  it('should logout correctly', () => {
    AuthService.setCookie('authToken', 'value', 123);
    AuthService.setCookie('adminAccess', 'value', 123);
    service.logout();

    expect(AuthService.getCookie('authToken')).toEqual('');
    expect(AuthService.getCookie('adminAccess')).toEqual('');
    expect(service.accessLevel).toEqual(['regular']);
    expect(service.loggedIn).toBeFalsy();
  })
});
