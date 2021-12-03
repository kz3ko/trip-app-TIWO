import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingScreenComponent } from './landing-screen/landing-screen.component';
import { WycieczkaDetailsScreenComponent } from './wycieczka-details-screen/wycieczka-details-screen.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { RegisterScreenComponent } from './register-screen/register-screen.component';
import { ReservationsScreenComponent } from './reservations-screen/reservations-screen.component';
import { CheckoutScreenComponent } from './checkout-screen/checkout-screen.component';
import { AuthGuard } from './auth-guard.service';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  { path: 'register', component: RegisterScreenComponent },
  { path: 'login', component: LoginScreenComponent },
  {
    path: 'checkout', component: CheckoutScreenComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reservations', component: ReservationsScreenComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin', component: AdminPanelComponent,
    canActivate: [AdminGuard]
  },
  { path: 'wycieczki/:id', pathMatch: 'full', component: WycieczkaDetailsScreenComponent },
  { path: 'wycieczki', pathMatch: 'full', component: LandingScreenComponent },
  { path: '', redirectTo: '/wycieczki', pathMatch: 'full' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
