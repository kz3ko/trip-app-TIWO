"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateRangeFilterComponent = void 0;
var core_1 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var DateRangeFilterComponent = /** @class */ (function () {
    function DateRangeFilterComponent(calendar, formatter) {
        var _this = this;
        this.calendar = calendar;
        this.formatter = formatter;
        this.hoveredDate = null;
        this.datesChanged = new core_1.EventEmitter();
        this.onDateSelection = function (date) {
            if (!_this.fromDate && !_this.toDate) {
                _this.fromDate = date;
            }
            else if (_this.fromDate && !_this.toDate && date && date.after(_this.fromDate)) {
                _this.toDate = date;
            }
            else {
                _this.toDate = null;
                _this.fromDate = date;
            }
            _this.emitNewDates();
        };
        this.emitNewDates = function () { return _this.datesChanged.emit({
            from: _this.fromDate, to: _this.toDate
        }); };
        this.isHovered = function (date) {
            return _this.fromDate && !_this.toDate && _this.hoveredDate && date.after(_this.fromDate) && date.before(_this.hoveredDate);
        };
        this.isInside = function (date) {
            return _this.toDate && date.after(_this.fromDate) && date.before(_this.toDate);
        };
        this.isRange = function (date) {
            return date.equals(_this.fromDate) || (_this.toDate && date.equals(_this.toDate)) || _this.isInside(date) || _this.isHovered(date);
        };
        this.validateInput = function (currentValue, input) {
            var parsed = _this.formatter.parse(input);
            return parsed && _this.calendar.isValid(ng_bootstrap_1.NgbDate.from(parsed)) ? ng_bootstrap_1.NgbDate.from(parsed) : currentValue;
        };
        this.fromDate = calendar.getToday();
        this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    }
    DateRangeFilterComponent.prototype.ngOnInit = function () {
        this.emitNewDates();
    };
    __decorate([
        core_1.Output()
    ], DateRangeFilterComponent.prototype, "datesChanged", void 0);
    DateRangeFilterComponent = __decorate([
        core_1.Component({
            selector: 'app-date-range-filter',
            templateUrl: './date-range-filter.component.html',
            styleUrls: ['./date-range-filter.component.scss']
        })
    ], DateRangeFilterComponent);
    return DateRangeFilterComponent;
}());
exports.DateRangeFilterComponent = DateRangeFilterComponent;
