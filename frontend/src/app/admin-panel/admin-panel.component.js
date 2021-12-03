"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPanelComponent = void 0;
var core_1 = require("@angular/core");
var AdminPanelComponent = /** @class */ (function () {
    function AdminPanelComponent(wycieczkiService) {
        var _this = this;
        this.wycieczkiService = wycieczkiService;
        this.allWycieczki = this.wycieczkiService.wycieczki;
        wycieczkiService.wycieczkiStream$.subscribe(function (wycieczki) {
            _this.allWycieczki = wycieczki;
        });
    }
    AdminPanelComponent.prototype.ngOnInit = function () {
    };
    AdminPanelComponent.prototype.handleRemoveWycieczka = function ($event) {
        this.wycieczkiService.deleteWycieczka($event);
    };
    AdminPanelComponent.prototype.handleEditWycieczka = function ($event) {
        this.wycieczkiService.updateWycieczka($event);
    };
    AdminPanelComponent.prototype.handleNewFlashDeal = function ($event) {
        this.wycieczkiService.pushFlashDeal($event);
    };
    AdminPanelComponent = __decorate([
        core_1.Component({
            selector: 'app-admin-panel',
            templateUrl: './admin-panel.component.html',
            styleUrls: ['./admin-panel.component.scss'],
        })
    ], AdminPanelComponent);
    return AdminPanelComponent;
}());
exports.AdminPanelComponent = AdminPanelComponent;
