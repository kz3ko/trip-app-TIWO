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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyWycieczkaComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ModifyWycieczkaComponent = /** @class */ (function () {
    function ModifyWycieczkaComponent(config, modalService, wycieczkiService) {
        var _this = this;
        this.modalService = modalService;
        this.wycieczkiService = wycieczkiService;
        this.editWycieczka = new core_1.EventEmitter();
        this.open = function (content) {
            _this.modal = _this.modalService.open(content, { size: 'xl' });
        };
        this.modifyWycieczka = function () {
            if (_this.form.valid) {
                _this.wycieczkiService.updateWycieczka(__assign(__assign(__assign({}, _this.wycieczka), _this.form.value), { galeria: _this.gallery }));
                _this.modal.close();
            }
            else {
                _this.touchAll();
            }
        };
        this.touchAll = function () {
            Object.keys(_this.form.controls).forEach(function (field) {
                var control = _this.form.get(field);
                control.markAsTouched({ onlySelf: true });
            });
        };
        this.resetForm = function () { return _this.form.reset(); };
        this.modalClose = function () {
            _this.resetForm();
            _this.modal.close();
        };
        // customize modal
        config.backdrop = 'static';
        config.keyboard = false;
    }
    ModifyWycieczkaComponent.prototype.ngOnInit = function () {
        var _a = this.wycieczka, nazwa = _a.nazwa, docelowyKraj = _a.docelowyKraj, dataRozpoczecia = _a.dataRozpoczecia, dataZakonczenia = _a.dataZakonczenia, cena = _a.cena, maxMiejsc = _a.maxMiejsc, opis = _a.opis, zdjecie = _a.zdjecie, galeria = _a.galeria;
        var parsedDataRozpoczecia = new Date(dataRozpoczecia).toISOString().split('T')[0];
        var parsedDataZakonczenia = new Date(dataZakonczenia).toISOString().split('T')[0];
        this.form = new forms_1.FormGroup({
            nazwa: new forms_1.FormControl(nazwa, forms_1.Validators.required),
            docelowyKraj: new forms_1.FormControl(docelowyKraj, forms_1.Validators.required),
            dataRozpoczecia: new forms_1.FormControl(parsedDataRozpoczecia, forms_1.Validators.required),
            dataZakonczenia: new forms_1.FormControl(parsedDataZakonczenia, forms_1.Validators.required),
            cena: new forms_1.FormControl(cena, forms_1.Validators.required),
            maxMiejsc: new forms_1.FormControl(maxMiejsc, forms_1.Validators.required),
            opis: new forms_1.FormControl(opis),
            zdjecie: new forms_1.FormControl(zdjecie, forms_1.Validators.required),
        });
        this.gallery = galeria;
    };
    Object.defineProperty(ModifyWycieczkaComponent.prototype, "nazwa", {
        get: function () {
            return this.form.get('nazwa');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModifyWycieczkaComponent.prototype, "docelowyKraj", {
        get: function () {
            return this.form.get('docelowyKraj');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModifyWycieczkaComponent.prototype, "dataRozpoczecia", {
        get: function () {
            return this.form.get('dataRozpoczecia');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModifyWycieczkaComponent.prototype, "dataZakonczenia", {
        get: function () {
            return this.form.get('dataZakonczenia');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModifyWycieczkaComponent.prototype, "cena", {
        get: function () {
            return this.form.get('cena');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModifyWycieczkaComponent.prototype, "maxMiejsc", {
        get: function () {
            return this.form.get('maxMiejsc');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModifyWycieczkaComponent.prototype, "opis", {
        get: function () {
            return this.form.get('opis');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModifyWycieczkaComponent.prototype, "zdjecie", {
        get: function () {
            return this.form.get('zdjecie');
        },
        enumerable: false,
        configurable: true
    });
    ModifyWycieczkaComponent.prototype.handleNewGallery = function ($event) {
        this.gallery = $event;
    };
    __decorate([
        core_1.Input()
    ], ModifyWycieczkaComponent.prototype, "wycieczka", void 0);
    __decorate([
        core_1.Output()
    ], ModifyWycieczkaComponent.prototype, "editWycieczka", void 0);
    ModifyWycieczkaComponent = __decorate([
        core_1.Component({
            selector: 'app-modify-wycieczka',
            templateUrl: './modify-wycieczka.component.html',
            styleUrls: ['./modify-wycieczka.component.scss'],
        })
    ], ModifyWycieczkaComponent);
    return ModifyWycieczkaComponent;
}());
exports.ModifyWycieczkaComponent = ModifyWycieczkaComponent;
