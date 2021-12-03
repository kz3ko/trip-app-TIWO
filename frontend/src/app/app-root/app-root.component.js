"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRootComponent = void 0;
var core_1 = require("@angular/core");
var AppRootComponent = /** @class */ (function () {
    function AppRootComponent(authService) {
        var _this = this;
        this.authService = authService;
        this.loggedIn = false;
        this.isAdmin = false;
        this.loggedIn = authService.loggedIn;
        this.isAdmin = authService.accessLevel.includes('admin');
        this.authService.loggedInStream$.subscribe(function (loggedIn) {
            _this.loggedIn = loggedIn;
        });
        this.authService.accessLevelsStream$.subscribe(function (accessLevels) {
            _this.isAdmin = accessLevels.includes('admin');
        });
    }
    AppRootComponent = __decorate([
        core_1.Component({
            selector: 'app-app-root',
            templateUrl: './app-root.component.html',
            styleUrls: ['./app-root.component.scss'],
        })
    ], AppRootComponent);
    return AppRootComponent;
}());
exports.AppRootComponent = AppRootComponent;
