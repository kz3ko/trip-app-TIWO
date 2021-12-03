import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl, FormControl, FormGroup, Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss'],
})
export class LoginScreenComponent implements OnInit, OnDestroy {
  form: FormGroup;

  generalLoginError = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnDestroy(): void {
    this.form.reset();
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  get username(): AbstractControl {
    return this.form.get('username');
  }

  login = () => {
    this.authService.login(this.form.value).subscribe(
      () => {
        this.router.navigate(['/wycieczki']);
      },
      (error: HttpErrorResponse) => {
        const errors = error.error as Record<string, string>;
        if (errors.error) {
          this.generalLoginError = errors.error;
        }
        if (errors.username) {
          this.username.setErrors({ message: errors.username });
        }
        if (errors.password) {
          this.password.setErrors({ message: errors.password });
        }
      },
    );
  }
}
