"use strict";
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
exports.RegionSelectComponent = void 0;
var core_1 = require("@angular/core");
var RegionSelectComponent = /** @class */ (function () {
    function RegionSelectComponent() {
        var _this = this;
        this.selectRegions = new core_1.EventEmitter();
        this.checkboxesValues = {};
        this.checkboxChange = function () {
            _this.selectRegions.emit(Object.entries(_this.checkboxesValues)
                .filter(function (_a) {
                var _ = _a[0], selected = _a[1];
                return selected;
            })
                .map(function (_a) {
                var region = _a[0], _ = _a[1];
                return region;
            }));
        };
    }
    Object.defineProperty(RegionSelectComponent.prototype, "availableRegions", {
        set: function (availableRegions) {
            var _this = this;
            this.regions = availableRegions.reduce(function (acc, region) { return (acc.includes(region) ? acc : __spreadArrays(acc, [region])); }, []);
            this.regions.forEach(function (region) {
                if (_this.checkboxesValues[region] === undefined) {
                    _this.checkboxesValues[region] = false;
                }
            });
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        core_1.Input()
    ], RegionSelectComponent.prototype, "availableRegions", null);
    __decorate([
        core_1.Output()
    ], RegionSelectComponent.prototype, "selectRegions", void 0);
    RegionSelectComponent = __decorate([
        core_1.Component({
            selector: 'app-region-select',
            templateUrl: './region-select.component.html',
            styleUrls: ['./region-select.component.scss'],
        })
    ], RegionSelectComponent);
    return RegionSelectComponent;
}());
exports.RegionSelectComponent = RegionSelectComponent;
