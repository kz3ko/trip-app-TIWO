"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WycieczkaComponent = void 0;
var core_1 = require("@angular/core");
var WycieczkaComponent = /** @class */ (function () {
    function WycieczkaComponent(wycieczkiService) {
        var _this = this;
        this.wycieczkiService = wycieczkiService;
        this.isRegistered = false;
        this.bookPlace = new core_1.EventEmitter();
        this.removePlace = new core_1.EventEmitter();
        this.rateWycieczka = new core_1.EventEmitter();
        this.removeWycieczka = new core_1.EventEmitter();
        this.editWycieczka = new core_1.EventEmitter();
        this.commentsVisible = false;
        this.flashDealsForThisWycieczka = [];
        this.removeOne = function (wycieczka) {
            if (wycieczka.rezerwowane) {
                _this.removePlace.emit(wycieczka);
            }
        };
        this.addOne = function (wycieczka) {
            if (wycieczka.rezerwowane < wycieczka.maxMiejsc) {
                _this.bookPlace.emit(wycieczka);
            }
        };
        this.removeSelf = function () { return _this.removeWycieczka.emit(_this.wycieczka); };
        this.onRateWycieczka = function (ocena) {
            _this.rateWycieczka.emit(ocena);
        };
        this.toggleComments = function () {
            _this.commentsVisible = !_this.commentsVisible;
        };
        this.onEditWycieczka = function () { return _this.editWycieczka.emit(_this.wycieczka); };
        wycieczkiService.rezerwacjeStream$.subscribe(function (newRezerwacje) {
            _this.findMatchingReservation(newRezerwacje);
        });
    }
    WycieczkaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.findMatchingReservation(this.wycieczkiService.rezerwacje);
        this.wycieczkiService.flashDealsForWycieczkaStream$(this.wycieczka).subscribe(function (newFlashDeals) {
            _this.flashDealsForThisWycieczka = newFlashDeals;
            _this.activeFlashDeal = _this.flashDealsForThisWycieczka.find(function (flashDeal) { return new Date(flashDeal.expires_at) > new Date(); });
        });
        this.flashDealUpdateInterval = setInterval(function () {
            // Update every second or so
            var previousActiveFlashDeal = !!(_this.activeFlashDeal);
            _this.activeFlashDeal = _this.flashDealsForThisWycieczka.find(function (flashDeal) { return (new Date(flashDeal.expires_at) > new Date()); });
            // This basically means that it has expired
            if (_this.activeFlashDeal === undefined && previousActiveFlashDeal) {
                _this.wycieczkiService.fetchFlashDeals();
            }
        }, 1500);
    };
    WycieczkaComponent.prototype.ngOnDestroy = function () {
        clearInterval(this.flashDealUpdateInterval);
    };
    WycieczkaComponent.prototype.findMatchingReservation = function (reservations) {
        var _this = this;
        this.rezerwacjaForThisWycieczka = reservations.find(function (rezerwacja) { return rezerwacja.wycieczka_id === _this.wycieczka._id; });
    };
    __decorate([
        core_1.Input()
    ], WycieczkaComponent.prototype, "wycieczka", void 0);
    __decorate([
        core_1.Input()
    ], WycieczkaComponent.prototype, "isAdminView", void 0);
    __decorate([
        core_1.Input()
    ], WycieczkaComponent.prototype, "isRegistered", void 0);
    __decorate([
        core_1.Input()
    ], WycieczkaComponent.prototype, "canRateObservable", void 0);
    __decorate([
        core_1.Input()
    ], WycieczkaComponent.prototype, "canRateBoolean", void 0);
    __decorate([
        core_1.Output()
    ], WycieczkaComponent.prototype, "bookPlace", void 0);
    __decorate([
        core_1.Output()
    ], WycieczkaComponent.prototype, "removePlace", void 0);
    __decorate([
        core_1.Output()
    ], WycieczkaComponent.prototype, "rateWycieczka", void 0);
    __decorate([
        core_1.Output()
    ], WycieczkaComponent.prototype, "removeWycieczka", void 0);
    __decorate([
        core_1.Output()
    ], WycieczkaComponent.prototype, "editWycieczka", void 0);
    WycieczkaComponent = __decorate([
        core_1.Component({
            selector: 'app-wycieczka',
            templateUrl: './wycieczka.component.html',
            styleUrls: ['./wycieczka.component.scss'],
        })
    ], WycieczkaComponent);
    return WycieczkaComponent;
}());
exports.WycieczkaComponent = WycieczkaComponent;
