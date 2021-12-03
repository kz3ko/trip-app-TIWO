"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var accounts_1 = __importDefault(require("./accounts"));
var trips_1 = __importDefault(require("./trips"));
var reservations_1 = __importDefault(require("./reservations"));
var flashDeals_1 = __importDefault(require("./flashDeals"));
var getRouter = function (io) {
    var router = express.Router();
    router.use(express.json());
    router.use('/accounts', accounts_1.default);
    router.use('/trips', trips_1.default(io));
    router.use('/reservations', reservations_1.default);
    router.use('/flash-deals', flashDeals_1.default(io));
    return router;
};
exports.default = getRouter;
