import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRootComponent } from './app-root.component';
import {AuthService} from "../auth-service.service";
import {of} from "rxjs";

class AuthServiceStub {
  loggedIn = false;
  accessLevel = ['regular'];
  loggedInStream$ = of(this.loggedIn);
  accessLevelsStream$ = of(this.accessLevel);
}

describe('AppRootComponent', () => {
  let component: AppRootComponent;
  let fixture: ComponentFixture<AppRootComponent>;
  let authServiceStub: Partial<AuthService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppRootComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ { provide: AuthService, useValue: new AuthServiceStub() }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRootComponent);
    component = fixture.componentInstance;
    authServiceStub = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // INTEGRATION TESTS
  it('should use service when assigning properties', () => {
    expect(component.loggedIn).toBe(authServiceStub.loggedIn);
    expect(component.isAdmin).toBeFalsy();
  });
});
