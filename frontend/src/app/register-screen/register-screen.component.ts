import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl, FormControl, FormGroup, Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-register-screen',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.scss'],
})
export class RegisterScreenComponent implements OnInit, OnDestroy {
  form: FormGroup;

  registerError: any;

  generalRegisterError: '';

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

  register = () => {
    this.registerError = null;
    this.authService.register(this.form.value).subscribe(
      () => {
        this.router.navigate(['/wycieczki']);
      },
      (error: HttpErrorResponse) => {
        const errors = error.error as Record<string, string>;
        if (errors.error) { this.registerError = error; }
        if (errors.username) {
          this.username.setErrors({ message: errors.username });
        }
        if (errors.password) {
          this.password.setErrors({ message: errors.password });
        }
      },
    );
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  get username(): AbstractControl {
    return this.form.get('username');
  }
}
