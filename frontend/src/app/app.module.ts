import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  NgbCarouselModule, NgbCollapseModule, NgbDatepickerModule, NgbRatingModule, NgbTimepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { Router } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule, InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { WycieczkiComponent } from './wycieczki/wycieczki.component';
import { NaglowekComponent } from './naglowek/naglowek.component';
import { WycieczkaComponent } from './wycieczka/wycieczka.component';
import { RateWycieczkaComponent } from './rate-wycieczka/rate-wycieczka.component';
import { WycieczkaCommentsComponent } from './wycieczka-comments/wycieczka-comments.component';
import { WycieczkiService } from './wycieczki.service';
import { AddWycieczkaComponent } from './add-wycieczka/add-wycieczka.component';
import { DecimalOnlyDirective } from './decimal-only.directive';
import { BasketComponent } from './basket/basket.component';
import { LandingScreenComponent } from './landing-screen/landing-screen.component';
import { FilterListComponent } from './filter-list/filter-list.component';
import { FiltersProviderService } from './filters-provider.service';
import { DateRangeFilterComponent } from './date-range-filter/date-range-filter.component';
import { TextSearchComponent } from './text-search/text-search.component';
import { PriceRangeComponent } from './price-range/price-range.component';
import { ReviewThresholdComponent } from './review-threshold/review-threshold.component';
import { RegionSelectComponent } from './region-select/region-select.component';
import { WycieczkaDetailsScreenComponent } from './wycieczka-details-screen/wycieczka-details-screen.component';
import { AppRootComponent } from './app-root/app-root.component';
import { NavComponent } from './nav/nav.component';
import { RegisterScreenComponent } from './register-screen/register-screen.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { CheckoutScreenComponent } from './checkout-screen/checkout-screen.component';
import { ReservationsScreenComponent } from './reservations-screen/reservations-screen.component';
import { InMemoryWycieczkiService } from './in-memory-wycieczki.service';
import { environment } from '../environments/environment';
import { AuthService } from './auth-service.service';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ModifyWycieczkaComponent } from './modify-wycieczka/modify-wycieczka.component';
import { APIIntereceptor } from './http-inerceptor';
import { MultiAdderComponent } from './multi-adder/multi-adder.component';
import { AddFlashDealComponent } from './add-flash-deal/add-flash-deal.component';

@NgModule({
  declarations: [
    WycieczkiComponent,
    NaglowekComponent,
    WycieczkaComponent,
    RateWycieczkaComponent,
    WycieczkaCommentsComponent,
    AddWycieczkaComponent,
    DecimalOnlyDirective,
    BasketComponent,
    LandingScreenComponent,
    FilterListComponent,
    DateRangeFilterComponent,
    TextSearchComponent,
    PriceRangeComponent,
    ReviewThresholdComponent,
    RegionSelectComponent,
    WycieczkaDetailsScreenComponent,
    AppRootComponent,
    NavComponent,
    RegisterScreenComponent,
    LoginScreenComponent,
    CheckoutScreenComponent,
    ReservationsScreenComponent,
    AdminPanelComponent,
    ModifyWycieczkaComponent,
    MultiAdderComponent,
    AddFlashDealComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbRatingModule,
    NgbCollapseModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgxSliderModule,
    NgbCarouselModule,
    HttpClientModule,
    NgbTimepickerModule,
    NgSelectModule,
    // InMemoryWebApiModule.forRoot(InMemoryWycieczkiService, {delay : 2000}),
  ],
  providers: [FiltersProviderService, WycieczkiService, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: APIIntereceptor,
    multi: true,
  }],
  bootstrap: [AppRootComponent],
})
export class AppModule {
  constructor(private router: Router) {

  }
}
