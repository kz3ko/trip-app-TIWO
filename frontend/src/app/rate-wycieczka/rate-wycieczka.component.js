"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateWycieczkaComponent = void 0;
var core_1 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var RateWycieczkaComponent = /** @class */ (function () {
    function RateWycieczkaComponent(config, modalService) {
        var _this = this;
        this.modalService = modalService;
        this.rateWycieczka = new core_1.EventEmitter();
        this.komentarz = '';
        this.gwiazdki = undefined;
        this.error = false;
        this.submitWycieczkaRate = function () {
            if (_this.gwiazdki || _this.komentarz) {
                _this.rateWycieczka.emit({
                    gwiazdki: _this.gwiazdki,
                    komentarz: _this.komentarz,
                });
                _this.modal.close();
            }
            else {
                _this.error = true;
            }
        };
        this.handleValueChange = function () {
            _this.error = false;
        };
        this.open = function (content) {
            _this.modal = _this.modalService.open(content);
        };
        // customize default values of modals used by this component tree
        config.backdrop = 'static';
        config.keyboard = false;
    }
    RateWycieczkaComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input()
    ], RateWycieczkaComponent.prototype, "wycieczkaId", void 0);
    __decorate([
        core_1.Input()
    ], RateWycieczkaComponent.prototype, "nazwa", void 0);
    __decorate([
        core_1.Input()
    ], RateWycieczkaComponent.prototype, "btnClass", void 0);
    __decorate([
        core_1.Output()
    ], RateWycieczkaComponent.prototype, "rateWycieczka", void 0);
    RateWycieczkaComponent = __decorate([
        core_1.Component({
            selector: 'app-rate-wycieczka',
            templateUrl: './rate-wycieczka.component.html',
            styleUrls: ['./rate-wycieczka.component.scss'],
            providers: [ng_bootstrap_1.NgbModalConfig, ng_bootstrap_1.NgbModal],
        })
    ], RateWycieczkaComponent);
    return RateWycieczkaComponent;
}());
exports.RateWycieczkaComponent = RateWycieczkaComponent;
