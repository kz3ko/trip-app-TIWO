import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  @Input() zalogowany: boolean;

  @Input() isAdmin: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  logout = () => {
    this.authService.logout();
    this.router.navigate(['/wycieczki']);
  }
}
