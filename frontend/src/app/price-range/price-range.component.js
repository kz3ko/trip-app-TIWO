"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceRangeComponent = void 0;
var core_1 = require("@angular/core");
var ngx_slider_1 = require("@angular-slider/ngx-slider");
var PriceRangeComponent = /** @class */ (function () {
    function PriceRangeComponent() {
        var _this = this;
        this.rangeChange = new core_1.EventEmitter();
        this.minValue = 0;
        this.options = {
            floor: 0,
            translate: function (value, label) {
                switch (label) {
                    case ngx_slider_1.LabelType.Low:
                        return '<b>od:</b> ' + value + '  PLN';
                    case ngx_slider_1.LabelType.High:
                        return '<b>do:</b> ' + value + '  PLN';
                    default:
                        return '';
                }
            }
        };
        this.onRangeChange = function () {
            _this.rangeChange.emit({
                min: _this.minValue,
                max: _this.maxValue,
            });
        };
    }
    Object.defineProperty(PriceRangeComponent.prototype, "ceil", {
        set: function (value) {
            this.options.ceil = value;
            this.maxValue = value;
        },
        enumerable: false,
        configurable: true
    });
    PriceRangeComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input()
    ], PriceRangeComponent.prototype, "ceil", null);
    __decorate([
        core_1.Output()
    ], PriceRangeComponent.prototype, "rangeChange", void 0);
    PriceRangeComponent = __decorate([
        core_1.Component({
            selector: 'app-price-range',
            templateUrl: './price-range.component.html',
            styleUrls: ['./price-range.component.scss']
        })
    ], PriceRangeComponent);
    return PriceRangeComponent;
}());
exports.PriceRangeComponent = PriceRangeComponent;
