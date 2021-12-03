"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasketComponent = void 0;
var core_1 = require("@angular/core");
var BasketComponent = /** @class */ (function () {
    function BasketComponent(wycieczkiService, renderer) {
        var _this = this;
        this.wycieczkiService = wycieczkiService;
        this.renderer = renderer;
        this.basketClosed = true;
        this.initializeWycieczkiStream = function () {
            _this.bookings = _this.wycieczkiService.rezerwacje;
            _this.wycieczki = _this.wycieczkiService.wycieczki;
            _this.flashDeals = _this.wycieczkiService.flashDeals;
            _this.updateBookingsWithWycieczkasAndFlashDeals();
            _this.wycieczkiService.rezerwacjeStream$.subscribe(function (rezerwacje) {
                _this.bookings = rezerwacje;
                _this.updateBookingsWithWycieczkasAndFlashDeals();
            });
            _this.wycieczkiService.wycieczkiStream$.subscribe(function (wycieczki) {
                _this.wycieczki = wycieczki;
                _this.updateBookingsWithWycieczkasAndFlashDeals();
            });
            _this.wycieczkiService.currentFlashDealsStream$.subscribe(function (flashDeals) {
                _this.flashDeals = flashDeals;
                _this.updateBookingsWithWycieczkasAndFlashDeals();
            });
        };
        this.toggleBasket = function () {
            _this.basketClosed = !_this.basketClosed;
            _this.bodyScrollUpdate();
        };
        this.bodyScrollUpdate = function () {
            if (_this.basketClosed) {
                _this.renderer.removeClass(document.body, 'ovh');
            }
            else {
                _this.renderer.addClass(document.body, 'ovh');
            }
        };
        this.updateBookingsWithWycieczkasAndFlashDeals = function () {
            _this.bookingsWithWycieczkas = _this.bookings.map(function (booking) {
                var wycieczka = _this.wycieczki.find(function (v) { return v._id === booking.wycieczka_id; });
                var flashDeal = _this.flashDeals.find(function (fd) { return fd.wycieczka_id === wycieczka._id; });
                return {
                    booking: booking, wycieczka: wycieczka, flashDeal: flashDeal,
                };
            }).filter(function (_a) {
                var wycieczka = _a.wycieczka;
                return !wycieczka.deleted;
            });
        };
        this.totalRezerwowane = function () { return _this.bookingsWithWycieczkas
            .reduce(function (val, _a) {
            var booking = _a.booking, wycieczka = _a.wycieczka, flashDeal = _a.flashDeal;
            return (val + (booking.miejsca * (wycieczka.cena - (flashDeal ? flashDeal.discount : 0))));
        }, 0); };
        this.initializeWycieczkiStream();
    }
    BasketComponent.prototype.ngOnInit = function () {
        this.bodyScrollUpdate();
    };
    __decorate([
        core_1.Input()
    ], BasketComponent.prototype, "zalogowany", void 0);
    BasketComponent = __decorate([
        core_1.Component({
            selector: 'app-basket',
            templateUrl: './basket.component.html',
            styleUrls: ['./basket.component.scss'],
        })
    ], BasketComponent);
    return BasketComponent;
}());
exports.BasketComponent = BasketComponent;
