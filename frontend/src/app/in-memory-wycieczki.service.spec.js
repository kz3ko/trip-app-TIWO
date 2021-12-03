"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var in_memory_wycieczki_service_1 = require("./in-memory-wycieczki.service");
describe('InMemoryWycieczkiService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(in_memory_wycieczki_service_1.InMemoryWycieczkiService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
