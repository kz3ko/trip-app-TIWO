"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiAdderComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var MultiAdderComponent = /** @class */ (function () {
    function MultiAdderComponent(fb) {
        var _this = this;
        this.fb = fb;
        this.touched = false;
        this.changeEvent = new core_1.EventEmitter();
        this.addInput = function () {
            var newGroup = _this.fb.control('', [forms_1.Validators.required, forms_1.Validators.maxLength(128)]);
            _this.formArray.push(newGroup);
        };
        this.delInput = function (index) {
            _this.formArray.removeAt(index);
            _this.change();
        };
        this.touchAll = function () {
            _this.formArray.controls.forEach(function (control) {
                control.markAsTouched({ onlySelf: true });
            });
        };
        this.change = function () {
            _this.changeEvent.next(_this.form.value.formArray.filter(function (elem) { return !!elem; }));
        };
        this.form = this.fb.group({
            formArray: this.fb.array([]),
        });
    }
    MultiAdderComponent.prototype.ngOnInit = function () {
        var _this = this;
        var newForm = this.fb.group({
            formArray: this.fb.array([]),
        });
        var arrayControl = newForm.controls.formArray;
        this.inputArray.forEach(function (inputValue) {
            var newGroup = _this.fb.control(inputValue, [forms_1.Validators.required, forms_1.Validators.maxLength(128)]);
            arrayControl.push(newGroup);
        });
        if (!arrayControl.length) {
            var newGroup = this.fb.control('', [forms_1.Validators.required, forms_1.Validators.maxLength(128)]);
            arrayControl.push(newGroup);
        }
        this.form = newForm;
        if (this.touched) {
            this.touchAll();
        }
    };
    Object.defineProperty(MultiAdderComponent.prototype, "formArray", {
        get: function () {
            return this.form.get('formArray');
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        core_1.Input()
    ], MultiAdderComponent.prototype, "inputArray", void 0);
    __decorate([
        core_1.Input()
    ], MultiAdderComponent.prototype, "touched", void 0);
    __decorate([
        core_1.Output()
    ], MultiAdderComponent.prototype, "changeEvent", void 0);
    MultiAdderComponent = __decorate([
        core_1.Component({
            selector: 'app-multi-adder',
            templateUrl: './multi-adder.component.html',
            styleUrls: ['./multi-adder.component.scss'],
        })
    ], MultiAdderComponent);
    return MultiAdderComponent;
}());
exports.MultiAdderComponent = MultiAdderComponent;
