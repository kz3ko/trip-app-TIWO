"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecimalOnlyDirective = void 0;
var core_1 = require("@angular/core");
var DecimalOnlyDirective = /** @class */ (function () {
    function DecimalOnlyDirective(el) {
        this.el = el;
        this.decimals = 0;
    }
    DecimalOnlyDirective.prototype.check = function (value) {
        if (this.decimals <= 0) {
            return String(value).match(new RegExp(/^\d+$/));
        }
        else {
            var regExpString = '^\\s*((\\d+(\\.\\d{0,' +
                this.decimals +
                '})?)|((\\d*(\\.\\d{1,' +
                this.decimals +
                '}))))\\s*$';
            return String(value).match(new RegExp(regExpString));
        }
    };
    DecimalOnlyDirective.prototype.run = function (oldValue) {
        var _this = this;
        setTimeout(function () {
            var currentValue = _this.el.nativeElement.value;
            if (currentValue !== '' && !_this.check(currentValue)) {
                _this.el.nativeElement.value = oldValue;
            }
        });
    };
    DecimalOnlyDirective.prototype.onKeyDown = function (event) {
        this.run(this.el.nativeElement.value);
    };
    DecimalOnlyDirective.prototype.onPaste = function (event) {
        this.run(this.el.nativeElement.value);
    };
    __decorate([
        core_1.Input()
    ], DecimalOnlyDirective.prototype, "decimals", void 0);
    __decorate([
        core_1.HostListener('keydown', ['$event'])
    ], DecimalOnlyDirective.prototype, "onKeyDown", null);
    __decorate([
        core_1.HostListener('paste', ['$event'])
    ], DecimalOnlyDirective.prototype, "onPaste", null);
    DecimalOnlyDirective = __decorate([
        core_1.Directive({
            selector: '[appDecimalOnly]'
        })
    ], DecimalOnlyDirective);
    return DecimalOnlyDirective;
}());
exports.DecimalOnlyDirective = DecimalOnlyDirective;
