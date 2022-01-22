import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterScreenComponent } from './register-screen.component';

describe('RegisterScreenComponent', () => {
  let component: RegisterScreenComponent;
  let fixture: ComponentFixture<RegisterScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterScreenComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterScreenComponent);
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
