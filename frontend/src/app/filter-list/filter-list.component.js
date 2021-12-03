"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterListComponent = exports.dateToNgbDate = void 0;
var core_1 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var dateToNgbDate = function (date) {
    return ng_bootstrap_1.NgbDate.from({ day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear() });
};
exports.dateToNgbDate = dateToNgbDate;
var meanWycieczkaRating = function (wycieczka) {
    return wycieczka.oceny.length ? wycieczka.oceny.reduce(function (acc, _a) {
        var gwiazdki = _a.gwiazdki;
        return acc + gwiazdki;
    }, 0) / (wycieczka.oceny.length + 1) : null;
};
var FilterListComponent = /** @class */ (function () {
    function FilterListComponent(wycieczkiService, filtersProviderService) {
        var _this = this;
        this.wycieczkiService = wycieczkiService;
        this.filtersProviderService = filtersProviderService;
        this.filters = {};
        this.filtersEnabled = {
            search: false,
            dateRange: false,
            priceRange: false,
            reviewThreshold: false,
            allowedRegions: false,
        };
        this.maxWycieczkaValue = 30000;
        this.swapFilter = function (filterName, filter) {
            if (filter) {
                _this.filters[filterName] = function (wycieczki) { return wycieczki.filter(filter); };
            }
            _this.pushNewFilters();
        };
        this.flipFilter = function (filterName) {
            _this.filtersEnabled[filterName] = !_this.filtersEnabled[filterName];
            _this.pushNewFilters();
        };
        this.pushNewFilters = function () {
            var enabledFilters = Object.entries(_this.filters)
                .filter(function (_a) {
                var name = _a[0];
                return _this.filtersEnabled[name];
            })
                .map(function (_a) {
                var _ = _a[0], value = _a[1];
                return value;
            });
            _this.filtersProviderService.changeFilters(enabledFilters);
        };
        this.getMaxWycieczkaValue = function () { return _this.maxWycieczkaValue; };
        this.availableRegions = function () { return _this.wycieczki.map(function (_a) {
            var docelowyKraj = _a.docelowyKraj;
            return (docelowyKraj);
        }); };
        this.onDateRangeChange = function (range) {
            if (!range.from || !range.to) {
                return;
            }
            var isInside = function (date) {
                return date.after(range.from) && date.before(range.to);
            };
            _this.swapFilter('dateRange', function (wycieczka) { return isInside(exports.dateToNgbDate(wycieczka.dataRozpoczecia)) && isInside(exports.dateToNgbDate(wycieczka.dataZakonczenia)); });
        };
        this.onSearchChange = function (search) {
            if (search) {
                _this.filtersEnabled.search = true;
                _this.swapFilter('search', (function (wycieczka) { return JSON.stringify(wycieczka).toLowerCase().includes(search.toLowerCase()); }));
            }
            else {
                _this.filtersEnabled.search = false;
            }
        };
        this.onPriceRangeChange = function (priceRange) {
            _this.swapFilter('priceRange', (function (wycieczka) { return wycieczka.cena <= priceRange.max && wycieczka.cena >= priceRange.min; }));
        };
        this.onReviewThresholdChange = function (threshold) {
            _this.swapFilter('reviewThreshold', function (wycieczka) {
                var meanResult = meanWycieczkaRating(wycieczka);
                if (meanResult) {
                    return meanResult >= threshold;
                }
                else {
                    return true;
                }
            });
        };
        this.onRegionsChange = function (regions) {
            _this.swapFilter('allowedRegions', (function (wycieczka) { return !regions.length || regions.includes(wycieczka.docelowyKraj); }));
            _this.filtersEnabled.allowedRegions = true;
        };
        this.wycieczki = this.wycieczkiService.wycieczki;
        this.wycieczkiService.wycieczkiStream$.subscribe(function (wycieczki) {
            _this.wycieczki = wycieczki;
            _this.maxWycieczkaValue = _this.wycieczki.reduce(function (acc, wycieczka) { return (wycieczka.cena > acc ? wycieczka.cena : acc); }, 0);
        });
    }
    FilterListComponent.prototype.ngOnInit = function () {
    };
    FilterListComponent = __decorate([
        core_1.Component({
            selector: 'app-filter-list',
            templateUrl: './filter-list.component.html',
            styleUrls: ['./filter-list.component.scss'],
            providers: []
        })
    ], FilterListComponent);
    return FilterListComponent;
}());
exports.FilterListComponent = FilterListComponent;
