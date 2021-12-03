"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var admin_guard_1 = require("./admin.guard");
describe('AdminGuard', function () {
    var guard;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        guard = testing_1.TestBed.inject(admin_guard_1.AdminGuard);
    });
    it('should be created', function () {
        expect(guard).toBeTruthy();
    });
});
