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
exports.WycieczkiService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var socket_io_client_1 = require("socket.io-client");
var operators_1 = require("rxjs/operators");
var environment_1 = require("../environments/environment");
var WycieczkiService = /** @class */ (function () {
    function WycieczkiService(filtersService, authService, http) {
        var _this = this;
        this.filtersService = filtersService;
        this.authService = authService;
        this.http = http;
        // Reservations
        this.rezerwacje = [];
        this.rezerwacjeSource = new rxjs_1.Subject(); // Rezerwacje subject
        this.rezerwacjeStream$ = this.rezerwacjeSource.asObservable(); // Rezerwacje stream
        // Fetching
        this.isFetchingStore = false;
        this.isFetchingSource = new rxjs_1.Subject();
        this.isFetchingStream$ = this.isFetchingSource.asObservable();
        // Wycieczki
        this.filteredWycieczki = [];
        this.wycieczkiSource = new rxjs_1.Subject(); // Wycieczki subject
        this.wycieczkiStream$ = this.wycieczkiSource.asObservable(); // Wycieczki stream
        this.filteredWycieczkiSource = new rxjs_1.Subject(); // Filtered Wycieczki subject
        this.filteredWycieczkiStream$ = this.filteredWycieczkiSource.asObservable(); // Filtered Wycieczki stream
        this.wycieczkiStore = [];
        // Flash Deals
        this.flashDealSource = new rxjs_1.Subject();
        this.flashDealStore = [];
        this.currentFlashDealsStream$ = this.flashDealSource.asObservable().pipe(operators_1.map(function (flashDeals) { return flashDeals
            .filter(function (flashDeal) { return _this.isFlashDealCurrent(flashDeal); }); }));
        this.isFlashDealCurrent = function (flashDeal) {
            var now = new Date();
            var startDate = new Date(flashDeal.starts_at);
            var endDate = new Date(flashDeal.expires_at);
            return endDate >= now && now >= startDate;
        };
        this.isFlashDealCurrentAndMatches = function (wycieczka, flashDeal) {
            if (flashDeal.wycieczka_id === wycieczka._id) {
                return _this.isFlashDealCurrent(flashDeal);
            }
            return false;
        };
        this.flashDealsForWycieczkaStream$ = function (wycieczka) { return _this.flashDealSource.asObservable().pipe(operators_1.map(function (flashDeals) { return flashDeals
            .filter(function (flashDeal) { return _this.isFlashDealCurrentAndMatches(wycieczka, flashDeal); }); })); };
        this.updateFilteredWycieczki = function (filters) {
            var filteredWycieczki = _this.applyFilters(filters || []);
            _this.filteredWycieczki = filteredWycieczki;
            _this.filteredWycieczkiSource.next(filteredWycieczki);
        };
        this.applyFilters = function (filters) {
            var filteredWycieczki = _this.wycieczki;
            filters.forEach(function (fltr) {
                filteredWycieczki = fltr(filteredWycieczki);
            });
            return filteredWycieczki;
        };
        // API
        this.fetchWycieczki = function (onFetch) {
            _this.isFetching = true;
            _this.http.get('/trips').subscribe(function (wycieczki) {
                _this.wycieczki = wycieczki;
                _this.isFetching = false;
                if (onFetch) {
                    onFetch(_this.wycieczki);
                }
            });
        };
        this.fetchRezerwacje = function () {
            _this.isFetching = true;
            _this.http.get('/reservations').subscribe(function (rezerwacje) {
                _this.rezerwacje = rezerwacje;
                _this.rezerwacjeSource.next(rezerwacje);
                _this.isFetching = false;
            });
        };
        this.fetchFlashDeals = function () {
            _this.isFetching = true;
            _this.http.get('/flash-deals').subscribe(function (flashDeals) {
                _this.flashDeals = flashDeals;
                _this.flashDealSource.next(flashDeals);
                _this.isFetching = false;
            });
        };
        this.deleteWycieczka = function (wycieczkaToDelete) {
            _this.isFetching = true;
            _this.http.delete("/trips/" + wycieczkaToDelete._id).subscribe(function (val) {
                _this.wycieczki = _this.wycieczki.filter(function (_a) {
                    var _id = _a._id;
                    return _id === wycieczkaToDelete._id;
                });
                _this.isFetching = false;
            });
        };
        this.addWycieczka = function (wycieczka) {
            _this.http.post('/trips/', wycieczka).subscribe(function (val) {
                _this.wycieczki = __spreadArrays(_this.wycieczki, [val]);
            });
        };
        this.updateWycieczka = function (wycieczkaToUpdate) {
            _this.http.put("/trips/" + wycieczkaToUpdate._id, wycieczkaToUpdate).subscribe(function (val) {
                _this.wycieczki = _this.wycieczki.map(function (wycieczka) { return (wycieczkaToUpdate._id === wycieczka._id ? val : wycieczka); });
            });
        };
        this.getWycieczka = function (id, onFetched) {
            var findInCache = _this.wycieczki.find(function (_a) {
                var _id = _a._id;
                return id === _id;
            });
            if (findInCache) {
                onFetched(findInCache);
                return;
            }
            _this.http.get("/trips/" + id).subscribe(function (val) {
                _this.wycieczki = __spreadArrays(_this.wycieczki, [val]);
                onFetched(val);
            });
        };
        this.canRateWycieczka = function (wycieczka) { return _this.rezerwacjeStream$.pipe(operators_1.map(function (rezerwacje) { return rezerwacje.some(function (rezerwacja) { return rezerwacja.wycieczka_id === wycieczka._id; }); })); };
        this.canRateNow = function (wycieczka) { return _this.rezerwacje
            .some(function (rezerwacja) { return rezerwacja.wycieczka_id === wycieczka._id; }); };
        this.rateWycieczka = function (ratingWycieczka, ocena) { return _this.http.post("/trips/" + ratingWycieczka._id + "/review", {
            comment: ocena.komentarz,
            rating: ocena.gwiazdki,
        })
            .subscribe(function (ratedWycieczka) {
            _this.wycieczki = _this.wycieczki.map(function (wycieczka) { return (wycieczka._id === ratingWycieczka._id
                ? __assign(__assign({}, wycieczka), { oceny: ratedWycieczka.oceny }) : wycieczka); });
        }); };
        this.bookPlace = function (bookedWycieczka) { return _this.http.post("/trips/" + bookedWycieczka._id + "/booking", {}).subscribe(function (_a) {
            var reservation = _a.reservation, trip = _a.trip;
            _this.updateWithWycieczka(trip);
            _this.shiftRezerwacja(reservation);
        }); };
        this.unBookPlace = function (unBookedWycieczka) { return _this.http.delete("/trips/" + unBookedWycieczka._id + "/booking", {})
            .subscribe(function (response) {
            if (response) {
                var reservation = response.reservation, trip = response.trip;
                _this.updateWithWycieczka(trip);
                _this.unshiftRezerwacja(reservation);
            }
            else {
                _this.filterRezerwacjeByWycieczka(unBookedWycieczka);
            }
        }); };
        this.updateWithWycieczka = function (newWycieczka) {
            _this.wycieczki = _this.wycieczki.map(function (wycieczka) { return (wycieczka._id === newWycieczka._id
                ? newWycieczka
                : wycieczka); });
        };
        this.shiftRezerwacja = function (newRezerwacja) {
            _this.rezerwacje = _this.rezerwacje.map(function (rezerwacja) { return (rezerwacja._id === newRezerwacja._id
                ? newRezerwacja
                : rezerwacja); });
            if (!_this.rezerwacje.includes(newRezerwacja)) { // There must be an instance of this object as a result of the function
                _this.rezerwacje.push(newRezerwacja);
            }
            _this.rezerwacjeSource.next(_this.rezerwacje);
        };
        this.unshiftRezerwacja = function (newRezerwacja) {
            _this.rezerwacje = _this.rezerwacje.map(function (rezerwacja) { return (rezerwacja._id === newRezerwacja._id
                ? newRezerwacja
                : rezerwacja); });
            _this.rezerwacjeSource.next(_this.rezerwacje);
        };
        this.filterRezerwacjeByWycieczka = function (wycieczka) {
            _this.rezerwacje = _this.rezerwacje.filter(function (rezerwacja) { return (rezerwacja.wycieczka_id !== wycieczka._id); });
            _this.rezerwacjeSource.next(_this.rezerwacje);
        };
        this.listenForUpdates = function () {
            var socket = socket_io_client_1.io(environment_1.environment.baseUrl);
            socket.on('wycieczkiUpdate', function () {
                _this.fetchWycieczki();
            });
            socket.on('rezerwacjeUpdate', function () {
                _this.fetchRezerwacje();
            });
            socket.on('flashDealsUpdate', function () {
                _this.fetchFlashDeals();
            });
        };
        this.fetchWycieczki();
        if (authService.loggedIn) {
            this.fetchRezerwacje();
        }
        this.fetchFlashDeals();
        filtersService.filterStream$.subscribe(this.updateFilteredWycieczki);
        authService.loggedInStream$.subscribe(function (newLoggedIn) {
            if (!newLoggedIn) {
                _this.rezerwacje = [];
                _this.rezerwacjeSource.next(_this.rezerwacje);
            }
            else {
                _this.fetchRezerwacje();
            }
        });
        this.listenForUpdates();
    }
    Object.defineProperty(WycieczkiService.prototype, "isFetching", {
        get: function () {
            return this.isFetchingStore;
        },
        set: function (value) {
            this.isFetchingStore = value;
            this.isFetchingSource.next(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WycieczkiService.prototype, "wycieczki", {
        get: function () {
            return this.wycieczkiStore;
        },
        set: function (newValue) {
            this.wycieczkiStore = newValue;
            this.wycieczkiSource.next(this.wycieczkiStore);
            this.updateFilteredWycieczki();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WycieczkiService.prototype, "flashDeals", {
        get: function () {
            return this.flashDealStore;
        },
        set: function (flashDeals) {
            this.flashDealStore = flashDeals;
            this.flashDealSource.next(flashDeals);
        },
        enumerable: false,
        configurable: true
    });
    WycieczkiService.prototype.pushFlashDeal = function (flashDealData) {
        var _this = this;
        this.http.post('/flash-deals/', flashDealData).subscribe(function (val) {
            _this.flashDeals = __spreadArrays(_this.flashDeals, [val]);
        });
    };
    WycieczkiService = __decorate([
        core_1.Injectable()
    ], WycieczkiService);
    return WycieczkiService;
}());
exports.WycieczkiService = WycieczkiService;
