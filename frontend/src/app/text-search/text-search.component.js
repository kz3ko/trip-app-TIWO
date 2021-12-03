"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextSearchComponent = void 0;
var core_1 = require("@angular/core");
var TextSearchComponent = /** @class */ (function () {
    function TextSearchComponent() {
        var _this = this;
        this.search = '';
        this.searchChange = new core_1.EventEmitter();
        this.onSearchChange = function (input) { return _this.searchChange.emit(input.trim()); };
    }
    TextSearchComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Output()
    ], TextSearchComponent.prototype, "searchChange", void 0);
    TextSearchComponent = __decorate([
        core_1.Component({
            selector: 'app-text-search',
            templateUrl: './text-search.component.html',
            styleUrls: ['./text-search.component.scss'],
        })
    ], TextSearchComponent);
    return TextSearchComponent;
}());
exports.TextSearchComponent = TextSearchComponent;
