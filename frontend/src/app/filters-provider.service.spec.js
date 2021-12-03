"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var filters_provider_service_1 = require("./filters-provider.service");
describe('FiltersProviderService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(filters_provider_service_1.FiltersProviderService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
