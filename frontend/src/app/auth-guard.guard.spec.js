"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var auth_guard_service_1 = require("./auth-guard.service");
describe('AuthGuardGuard', function () {
    var guard;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        guard = testing_1.TestBed.inject(auth_guard_service_1.AuthGuard);
    });
    it('should be created', function () {
        expect(guard).toBeTruthy();
    });
});
