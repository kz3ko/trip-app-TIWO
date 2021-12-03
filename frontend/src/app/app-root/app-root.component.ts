import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss'],
})
export class AppRootComponent {
  loggedIn = false;

  isAdmin = false;

  constructor(private authService: AuthService) {
    this.loggedIn = authService.loggedIn;
    this.isAdmin = authService.accessLevel.includes('admin');
    this.authService.loggedInStream$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
    this.authService.accessLevelsStream$.subscribe((accessLevels) => {
      this.isAdmin = accessLevels.includes('admin');
    });
  }
}
