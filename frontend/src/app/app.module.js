"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var forms_1 = require("@angular/forms");
var ngx_slider_1 = require("@angular-slider/ngx-slider");
var http_1 = require("@angular/common/http");
var ng_select_1 = require("@ng-select/ng-select");
var app_routing_module_1 = require("./app-routing.module");
var wycieczki_component_1 = require("./wycieczki/wycieczki.component");
var naglowek_component_1 = require("./naglowek/naglowek.component");
var wycieczka_component_1 = require("./wycieczka/wycieczka.component");
var rate_wycieczka_component_1 = require("./rate-wycieczka/rate-wycieczka.component");
var wycieczka_comments_component_1 = require("./wycieczka-comments/wycieczka-comments.component");
var wycieczki_service_1 = require("./wycieczki.service");
var add_wycieczka_component_1 = require("./add-wycieczka/add-wycieczka.component");
var decimal_only_directive_1 = require("./decimal-only.directive");
var basket_component_1 = require("./basket/basket.component");
var landing_screen_component_1 = require("./landing-screen/landing-screen.component");
var filter_list_component_1 = require("./filter-list/filter-list.component");
var filters_provider_service_1 = require("./filters-provider.service");
var date_range_filter_component_1 = require("./date-range-filter/date-range-filter.component");
var text_search_component_1 = require("./text-search/text-search.component");
var price_range_component_1 = require("./price-range/price-range.component");
var review_threshold_component_1 = require("./review-threshold/review-threshold.component");
var region_select_component_1 = require("./region-select/region-select.component");
var wycieczka_details_screen_component_1 = require("./wycieczka-details-screen/wycieczka-details-screen.component");
var app_root_component_1 = require("./app-root/app-root.component");
var nav_component_1 = require("./nav/nav.component");
var register_screen_component_1 = require("./register-screen/register-screen.component");
var login_screen_component_1 = require("./login-screen/login-screen.component");
var checkout_screen_component_1 = require("./checkout-screen/checkout-screen.component");
var reservations_screen_component_1 = require("./reservations-screen/reservations-screen.component");
var auth_service_service_1 = require("./auth-service.service");
var admin_panel_component_1 = require("./admin-panel/admin-panel.component");
var modify_wycieczka_component_1 = require("./modify-wycieczka/modify-wycieczka.component");
var http_inerceptor_1 = require("./http-inerceptor");
var multi_adder_component_1 = require("./multi-adder/multi-adder.component");
var add_flash_deal_component_1 = require("./add-flash-deal/add-flash-deal.component");
var AppModule = /** @class */ (function () {
    function AppModule(router) {
        this.router = router;
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                wycieczki_component_1.WycieczkiComponent,
                naglowek_component_1.NaglowekComponent,
                wycieczka_component_1.WycieczkaComponent,
                rate_wycieczka_component_1.RateWycieczkaComponent,
                wycieczka_comments_component_1.WycieczkaCommentsComponent,
                add_wycieczka_component_1.AddWycieczkaComponent,
                decimal_only_directive_1.DecimalOnlyDirective,
                basket_component_1.BasketComponent,
                landing_screen_component_1.LandingScreenComponent,
                filter_list_component_1.FilterListComponent,
                date_range_filter_component_1.DateRangeFilterComponent,
                text_search_component_1.TextSearchComponent,
                price_range_component_1.PriceRangeComponent,
                review_threshold_component_1.ReviewThresholdComponent,
                region_select_component_1.RegionSelectComponent,
                wycieczka_details_screen_component_1.WycieczkaDetailsScreenComponent,
                app_root_component_1.AppRootComponent,
                nav_component_1.NavComponent,
                register_screen_component_1.RegisterScreenComponent,
                login_screen_component_1.LoginScreenComponent,
                checkout_screen_component_1.CheckoutScreenComponent,
                reservations_screen_component_1.ReservationsScreenComponent,
                admin_panel_component_1.AdminPanelComponent,
                modify_wycieczka_component_1.ModifyWycieczkaComponent,
                multi_adder_component_1.MultiAdderComponent,
                add_flash_deal_component_1.AddFlashDealComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                ng_bootstrap_1.NgbRatingModule,
                ng_bootstrap_1.NgbCollapseModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                ng_bootstrap_1.NgbDatepickerModule,
                ngx_slider_1.NgxSliderModule,
                ng_bootstrap_1.NgbCarouselModule,
                http_1.HttpClientModule,
                ng_bootstrap_1.NgbTimepickerModule,
                ng_select_1.NgSelectModule,
            ],
            providers: [filters_provider_service_1.FiltersProviderService, wycieczki_service_1.WycieczkiService, auth_service_service_1.AuthService, {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: http_inerceptor_1.APIIntereceptor,
                    multi: true,
                }],
            bootstrap: [app_root_component_1.AppRootComponent],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
