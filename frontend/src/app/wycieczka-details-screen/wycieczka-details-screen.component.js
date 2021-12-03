"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WycieczkaDetailsScreenComponent = void 0;
var core_1 = require("@angular/core");
var WycieczkaDetailsScreenComponent = /** @class */ (function () {
    function WycieczkaDetailsScreenComponent(route, service) {
        var _this = this;
        this.route = route;
        this.service = service;
        this.onRateWycieczka = function ($event) {
            var updatedWycieczka = __assign(__assign({}, _this.wycieczka), { oceny: __spreadArrays(_this.wycieczka.oceny, [$event]) });
            _this.service.updateWycieczka(updatedWycieczka);
            _this.wycieczka = updatedWycieczka;
        };
        this.formatDate = function (date) { return new Date(date).toLocaleDateString(); };
    }
    WycieczkaDetailsScreenComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.service.getWycieczka(params.id, function (wycieczka) {
                _this.wycieczka = wycieczka;
            });
        });
    };
    Object.defineProperty(WycieczkaDetailsScreenComponent.prototype, "dataRozpoczecia", {
        get: function () {
            return this.formatDate(this.wycieczka.dataZakonczenia);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WycieczkaDetailsScreenComponent.prototype, "dataZakonczenia", {
        get: function () {
            return this.formatDate(this.wycieczka.dataRozpoczecia);
        },
        enumerable: false,
        configurable: true
    });
    WycieczkaDetailsScreenComponent = __decorate([
        core_1.Component({
            selector: 'app-wycieczka-details-screen',
            templateUrl: './wycieczka-details-screen.component.html',
            styleUrls: ['./wycieczka-details-screen.component.scss'],
        })
    ], WycieczkaDetailsScreenComponent);
    return WycieczkaDetailsScreenComponent;
}());
exports.WycieczkaDetailsScreenComponent = WycieczkaDetailsScreenComponent;
