"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var wycieczki_service_1 = require("./wycieczki.service");
describe('WycieczkiServiceService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(wycieczki_service_1.WycieczkiService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
