"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterScreenComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var RegisterScreenComponent = /** @class */ (function () {
    function RegisterScreenComponent(authService, router) {
        var _this = this;
        this.authService = authService;
        this.router = router;
        this.register = function () {
            _this.registerError = null;
            _this.authService.register(_this.form.value).subscribe(function () {
                _this.router.navigate(['/wycieczki']);
            }, function (error) {
                var errors = error.error;
                if (errors.error) {
                    _this.registerError = error;
                }
                if (errors.username) {
                    _this.username.setErrors({ message: errors.username });
                }
                if (errors.password) {
                    _this.password.setErrors({ message: errors.password });
                }
            });
        };
    }
    RegisterScreenComponent.prototype.ngOnInit = function () {
        this.form = new forms_1.FormGroup({
            username: new forms_1.FormControl('', forms_1.Validators.required),
            password: new forms_1.FormControl('', forms_1.Validators.required),
        });
    };
    RegisterScreenComponent.prototype.ngOnDestroy = function () {
        this.form.reset();
    };
    Object.defineProperty(RegisterScreenComponent.prototype, "password", {
        get: function () {
            return this.form.get('password');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegisterScreenComponent.prototype, "username", {
        get: function () {
            return this.form.get('username');
        },
        enumerable: false,
        configurable: true
    });
    RegisterScreenComponent = __decorate([
        core_1.Component({
            selector: 'app-register-screen',
            templateUrl: './register-screen.component.html',
            styleUrls: ['./register-screen.component.scss'],
        })
    ], RegisterScreenComponent);
    return RegisterScreenComponent;
}());
exports.RegisterScreenComponent = RegisterScreenComponent;
