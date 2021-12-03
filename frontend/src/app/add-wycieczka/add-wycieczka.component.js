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
exports.AddWycieczkaComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var AddWycieczkaComponent = /** @class */ (function () {
    function AddWycieczkaComponent(config, modalService, wycieczkiService) {
        var _this = this;
        this.modalService = modalService;
        this.wycieczkiService = wycieczkiService;
        this.gallery = [];
        this.open = function (content) {
            _this.modal = _this.modalService.open(content, { size: 'xl' });
        };
        this.addWycieczka = function () {
            if (_this.form.valid) {
                _this.wycieczkiService.addWycieczka(__assign(__assign({}, _this.form.value), { galeria: _this.gallery }));
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
    AddWycieczkaComponent.prototype.ngOnInit = function () {
        // create model form
        this.form = new forms_1.FormGroup({
            nazwa: new forms_1.FormControl('', forms_1.Validators.required),
            docelowyKraj: new forms_1.FormControl('', forms_1.Validators.required),
            dataRozpoczecia: new forms_1.FormControl(null, forms_1.Validators.required),
            dataZakonczenia: new forms_1.FormControl(null, forms_1.Validators.required),
            cena: new forms_1.FormControl(null, forms_1.Validators.required),
            maxMiejsc: new forms_1.FormControl(null, forms_1.Validators.required),
            opis: new forms_1.FormControl(''),
            zdjecie: new forms_1.FormControl('', forms_1.Validators.required),
        });
    };
    Object.defineProperty(AddWycieczkaComponent.prototype, "nazwa", {
        get: function () {
            return this.form.get('nazwa');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddWycieczkaComponent.prototype, "docelowyKraj", {
        get: function () {
            return this.form.get('docelowyKraj');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddWycieczkaComponent.prototype, "dataRozpoczecia", {
        get: function () {
            return this.form.get('dataRozpoczecia');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddWycieczkaComponent.prototype, "dataZakonczenia", {
        get: function () {
            return this.form.get('dataZakonczenia');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddWycieczkaComponent.prototype, "cena", {
        get: function () {
            return this.form.get('cena');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddWycieczkaComponent.prototype, "maxMiejsc", {
        get: function () {
            return this.form.get('maxMiejsc');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddWycieczkaComponent.prototype, "opis", {
        get: function () {
            return this.form.get('opis');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddWycieczkaComponent.prototype, "zdjecie", {
        get: function () {
            return this.form.get('zdjecie');
        },
        enumerable: false,
        configurable: true
    });
    AddWycieczkaComponent.prototype.handleNewGallery = function ($event) {
        this.gallery = $event;
    };
    AddWycieczkaComponent = __decorate([
        core_1.Component({
            selector: 'app-add-wycieczka',
            templateUrl: './add-wycieczka.component.html',
            styleUrls: ['./add-wycieczka.component.scss'],
            providers: [ng_bootstrap_1.NgbModalConfig, ng_bootstrap_1.NgbModal],
        })
    ], AddWycieczkaComponent);
    return AddWycieczkaComponent;
}());
exports.AddWycieczkaComponent = AddWycieczkaComponent;
