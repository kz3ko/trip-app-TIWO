import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginScreenComponent } from './login-screen.component';

describe('LoginScreenComponent', () => {
  let component: LoginScreenComponent;
  let fixture: ComponentFixture<LoginScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginScreenComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty fields after being created', () => {
    component.ngOnInit();

    expect(component.username.value).toBe('');
    expect(component.password.value).toBe('');
  });

  it('should get values from form', () => {
    const username = 'Andrzej83';
    const password = 'password';

    component.form.controls.username.setValue(username);
    component.form.controls.password.setValue(password);

    expect(component.username.value).toBe(username);
    expect(component.password.value).toBe(password);
  });
});
