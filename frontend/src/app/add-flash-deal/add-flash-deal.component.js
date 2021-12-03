"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFlashDealComponent = void 0;
var core_1 = require("@angular/core");
var AddFlashDealComponent = /** @class */ (function () {
    function AddFlashDealComponent(config, modalService, wycieczkiService) {
        var _this = this;
        this.modalService = modalService;
        this.wycieczkiService = wycieczkiService;
        this.addFlashDeal = new core_1.EventEmitter();
        this.discount = 0;
        this.initTimes = function () {
            var now = new Date();
            var nowPlusCoupleHours = new Date(now);
            nowPlusCoupleHours.setHours(now.getHours() + 4);
            _this.startDate = _this.getDateString(now);
            _this.endDate = _this.getDateString(nowPlusCoupleHours);
            _this.startTime = {
                hour: now.getHours(), minute: now.getMinutes(), second: 0,
            };
            _this.endTime = {
                hour: nowPlusCoupleHours.getHours(), minute: nowPlusCoupleHours.getMinutes(), second: 0,
            };
            _this.availableWycieczkas = _this.wycieczkiService.wycieczki;
            _this.wycieczkiService.wycieczkiStream$.subscribe(function (newWycieczki) {
                _this.availableWycieczkas = newWycieczki;
            });
        };
        this.open = function (content) {
            _this.modal = _this.modalService.open(content, { size: 'xl' });
        };
        this.setTime = function (date, time) {
            date.setHours(time.hour);
            date.setMinutes(time.minute);
            date.setSeconds(time.second);
            return date;
        };
        config.backdrop = 'static';
        config.keyboard = false;
    }
    AddFlashDealComponent.prototype.getDateString = function (value) {
        return value.getFullYear() + "-" + (value.getMonth() + 1) + "-" + value.getDate();
    };
    AddFlashDealComponent.prototype.ngOnInit = function () {
        this.initTimes();
    };
    AddFlashDealComponent.prototype.cancel = function () {
        this.modal.close();
    };
    AddFlashDealComponent.prototype.submitForm = function () {
        var _a = this.startDate.split('-'), startYear = _a[0], startMonth = _a[1], startDay = _a[2];
        var _b = this.endDate.split('-'), endYear = _b[0], endMonth = _b[1], endDay = _b[2];
        // tslint:disable-next-line:variable-name
        var starts_at = this.setTime(new Date(parseInt(startYear, 10), parseInt(startMonth, 10) - 1, parseInt(startDay, 10)), this.startTime);
        // tslint:disable-next-line:variable-name
        var expires_at = this.setTime(new Date(parseInt(endYear, 10), parseInt(endMonth, 10) - 1, parseInt(endDay, 10)), this.endTime);
        this.addFlashDeal.emit({
            starts_at: starts_at,
            expires_at: expires_at,
            wycieczka_id: this.selectedWycieczkaId,
            discount: this.discount,
        });
        this.modal.close();
    };
    __decorate([
        core_1.Output()
    ], AddFlashDealComponent.prototype, "addFlashDeal", void 0);
    AddFlashDealComponent = __decorate([
        core_1.Component({
            selector: 'app-add-flash-deal',
            templateUrl: './add-flash-deal.component.html',
            styleUrls: ['./add-flash-deal.component.scss'],
        })
    ], AddFlashDealComponent);
    return AddFlashDealComponent;
}());
exports.AddFlashDealComponent = AddFlashDealComponent;
