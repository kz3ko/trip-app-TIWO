"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var landing_screen_component_1 = require("./landing-screen/landing-screen.component");
var wycieczka_details_screen_component_1 = require("./wycieczka-details-screen/wycieczka-details-screen.component");
var login_screen_component_1 = require("./login-screen/login-screen.component");
var register_screen_component_1 = require("./register-screen/register-screen.component");
var reservations_screen_component_1 = require("./reservations-screen/reservations-screen.component");
var checkout_screen_component_1 = require("./checkout-screen/checkout-screen.component");
var auth_guard_service_1 = require("./auth-guard.service");
var admin_panel_component_1 = require("./admin-panel/admin-panel.component");
var admin_guard_1 = require("./admin.guard");
var routes = [
    { path: 'register', component: register_screen_component_1.RegisterScreenComponent },
    { path: 'login', component: login_screen_component_1.LoginScreenComponent },
    {
        path: 'checkout', component: checkout_screen_component_1.CheckoutScreenComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'reservations', component: reservations_screen_component_1.ReservationsScreenComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'admin', component: admin_panel_component_1.AdminPanelComponent,
        canActivate: [admin_guard_1.AdminGuard]
    },
    { path: 'wycieczki/:id', pathMatch: 'full', component: wycieczka_details_screen_component_1.WycieczkaDetailsScreenComponent },
    { path: 'wycieczki', pathMatch: 'full', component: landing_screen_component_1.LandingScreenComponent },
    { path: '', redirectTo: '/wycieczki', pathMatch: 'full' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule],
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
