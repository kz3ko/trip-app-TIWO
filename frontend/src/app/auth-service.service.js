"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        var _this = this;
        this.http = http;
        this.loggedInSource = new rxjs_1.Subject(); // Logged in subject
        this.loggedInStream$ = this.loggedInSource.asObservable(); // Logged in stream
        this.loggedIn = false;
        this.accessLevel = [];
        this.accessLevelsSource = new rxjs_1.Subject(); // access levels in subject
        this.accessLevelsStream$ = this.accessLevelsSource.asObservable(); // access levels in stream
        this.getLoggedIn = function () { return !!AuthService_1.getApiToken(); };
        this.login = function (credentials) { return _this.http.post('/accounts/login', credentials).pipe(operators_1.tap(function () {
            _this.accessLevel = AuthService_1.getAccessLevel();
            _this.accessLevelsSource.next(_this.accessLevel);
            _this.loggedInSource.next(true);
            _this.loggedIn = true;
        }), operators_1.catchError(function (err) {
            _this.loggedIn = false;
            throw err;
        })); };
        this.register = function (credentials) { return _this.http.post('/accounts/register', credentials); };
        this.logout = function () {
            AuthService_1.deleteCookie('authToken');
            AuthService_1.deleteCookie('adminAccess');
            _this.accessLevel = AuthService_1.getAccessLevel();
            _this.accessLevelsSource.next(_this.accessLevel);
            _this.loggedInSource.next(false);
            _this.loggedIn = false;
        };
        this.loggedIn = this.getLoggedIn();
        this.loggedInSource.next(this.loggedIn);
        this.accessLevel = AuthService_1.getAccessLevel();
        this.accessLevelsSource.next(this.accessLevel);
    }
    AuthService_1 = AuthService;
    AuthService.getAccessLevel = function () {
        console.log(AuthService_1.getCookie('adminAccess'));
        if (AuthService_1.getCookie('adminAccess') === 'true') {
            return ['admin'];
        }
        return ['regular'];
    };
    AuthService.getApiToken = function () {
        return AuthService_1.getCookie('authToken') || null;
    };
    AuthService.getCookie = function (name) {
        var ca = document.cookie.split(';');
        var cookieName = name + "=";
        var c;
        var value = '';
        ca.forEach(function (elem) {
            c = elem.replace(/^\s+/g, '');
            if (c.indexOf(cookieName) === 0) {
                value = c.substring(cookieName.length, c.length);
            }
        });
        return value;
    };
    AuthService.deleteCookie = function (name) {
        this.setCookie(name, '', -1);
    };
    AuthService.setCookie = function (name, value, expireDays, path) {
        if (path === void 0) { path = ''; }
        var d = new Date();
        d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
        var expires = "expires=" + d.toUTCString();
        var cpath = path ? "; path=" + path : '';
        document.cookie = name + "=" + value + "; " + expires + cpath;
    };
    var AuthService_1;
    AuthService = AuthService_1 = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
