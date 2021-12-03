"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WycieczkiComponent = void 0;
var core_1 = require("@angular/core");
var WycieczkiComponent = /** @class */ (function () {
    function WycieczkiComponent(wycieczkiService, authService) {
        var _this = this;
        this.wycieczkiService = wycieczkiService;
        this.authService = authService;
        this.zarezerwowaneTotal = 0;
        this.isFetching = false;
        this.loggedIn = false;
        this.anyMoreExpensive = function (wycieczka) { return _this.displayedWycieczki.some(function (innaWycieczka) { return innaWycieczka.cena > wycieczka.cena; }); };
        this.anyLessExpensive = function (wycieczka) { return _this.displayedWycieczki.some(function (innaWycieczka) { return innaWycieczka.cena < wycieczka.cena; }); };
        this.isMostExpensive = function (wycieczka) { return (!_this.anyMoreExpensive(wycieczka)); };
        this.isCheapest = function (wycieczka) { return (!_this.anyLessExpensive(wycieczka)); };
        this.handleRemovePlace = function (wycieczka) {
            _this.wycieczkiService.unBookPlace(wycieczka);
        };
        this.handleBookPlace = function (wycieczka) {
            _this.wycieczkiService.bookPlace(wycieczka);
        };
        this.handleRemoveWycieczka = function (wycieczka) {
            _this.wycieczkiService.deleteWycieczka(wycieczka);
        };
        this.initializeWycieczkiStream = function () {
            _this.displayedWycieczki = _this.wycieczkiService.filteredWycieczki.filter(function (wycieczka) { return !wycieczka.deleted; });
            _this.wycieczkiService.filteredWycieczkiStream$.subscribe(function (filteredWycieczki) {
                _this.displayedWycieczki = filteredWycieczki.filter(function (wycieczka) { return !wycieczka.deleted; });
            });
            _this.isFetching = _this.wycieczkiService.isFetching;
            _this.wycieczkiService.isFetchingStream$.subscribe(function (nextIsFetching) {
                _this.isFetching = nextIsFetching;
            });
            _this.loggedIn = _this.authService.loggedIn;
            _this.authService.loggedInStream$.subscribe(function (newLoggedIn) {
                _this.loggedIn = newLoggedIn;
            });
        };
        this.handleRateWycieczka = function (wycieczka, ocena) {
            _this.wycieczkiService.rateWycieczka(wycieczka, ocena);
        };
        this.initializeWycieczkiStream();
    }
    WycieczkiComponent.prototype.ngOnInit = function () {
    };
    WycieczkiComponent.prototype.canRate = function (wycieczka) {
        return this.wycieczkiService.canRateWycieczka(wycieczka);
    };
    WycieczkiComponent.prototype.canRateNow = function (wycieczka) {
        return this.wycieczkiService.canRateNow(wycieczka);
    };
    WycieczkiComponent = __decorate([
        core_1.Component({
            selector: 'app-wycieczki',
            templateUrl: './wycieczki.component.html',
            styleUrls: ['./wycieczki.component.scss'],
            providers: [],
        })
    ], WycieczkiComponent);
    return WycieczkiComponent;
}());
exports.WycieczkiComponent = WycieczkiComponent;
