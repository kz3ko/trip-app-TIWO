"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIIntereceptor = void 0;
var environment_1 = require("../environments/environment");
var APIIntereceptor = /** @class */ (function () {
    function APIIntereceptor() {
    }
    APIIntereceptor.prototype.intercept = function (req, next) {
        // Clone the request to add the new header
        var clonedRequest = req.clone({ url: environment_1.environment.baseApiUrl + req.url, withCredentials: true });
        // Pass the cloned request instead of the original request to the next handle
        return next.handle(clonedRequest);
    };
    return APIIntereceptor;
}());
exports.APIIntereceptor = APIIntereceptor;
