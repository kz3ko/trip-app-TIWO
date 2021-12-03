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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var jwt = __importStar(require("jsonwebtoken"));
var user_1 = __importDefault(require("../../models/user"));
var permissionsUtils_1 = require("../../utils/permissionsUtils");
var requestUtils_1 = require("../../utils/requestUtils");
var router = express.Router();
router.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, username, password, existingUser, _b, token, options, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                if (!process.env.JWT_KEY || !process.env.TOKEN_EXPIRING_TIME) {
                    return [2 /*return*/, res.status(500).send({ error: 'Bad server configuration: Token details missing' })];
                }
                errors = requestUtils_1.requireParams(req.body, 'username', 'password');
                if (errors) {
                    return [2 /*return*/, res.status(401).send(errors)];
                }
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, user_1.default.findOne({ username: username })];
            case 1:
                existingUser = _f.sent();
                _b = !existingUser;
                if (_b) return [3 /*break*/, 3];
                return [4 /*yield*/, existingUser.passwordEquals(password)];
            case 2:
                _b = !(_f.sent());
                _f.label = 3;
            case 3:
                if (_b) { // Inline to lazily check it
                    return [2 /*return*/, res.status(401).send({
                            error: 'Wrong username or password',
                        })];
                }
                token = jwt.sign({ username: username }, process.env.JWT_KEY, {
                    algorithm: 'HS256',
                    expiresIn: parseInt(process.env.TOKEN_EXPIRING_TIME, 10),
                });
                options = {
                    maxAge: parseInt(process.env.TOKEN_EXPIRING_TIME, 10) * 1000,
                };
                _d = (_c = res.status(200)
                    .cookie('authToken', token, options))
                    .cookie;
                _e = ['adminAccess'];
                return [4 /*yield*/, permissionsUtils_1.isAdmin(existingUser)];
            case 4: return [2 /*return*/, _d.apply(_c, _e.concat([_f.sent(), options]))
                    .end()];
        }
    });
}); });
router.post('/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, errors, existingUser, user, passwordSet, resultDocument, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                errors = requestUtils_1.requireParams(req.body, 'username', 'password');
                if (errors) {
                    return [2 /*return*/, res.status(401).send(errors)];
                }
                return [4 /*yield*/, user_1.default.exists({ username: username })];
            case 1:
                existingUser = _b.sent();
                if (existingUser) {
                    return [2 /*return*/, res.status(400).send({
                            username: 'User with this name already exists',
                        })];
                }
                user = new user_1.default({ username: username });
                return [4 /*yield*/, user.setPassword(password)];
            case 2:
                passwordSet = _b.sent();
                if (!passwordSet) return [3 /*break*/, 7];
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, user.save()];
            case 4:
                resultDocument = _b.sent();
                return [2 /*return*/, res.send(resultDocument.response())];
            case 5:
                e_1 = _b.sent();
                return [2 /*return*/, res.status(500).send({ error: e_1.message })];
            case 6: return [3 /*break*/, 8];
            case 7: return [2 /*return*/, res.status(500).end()];
            case 8: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
