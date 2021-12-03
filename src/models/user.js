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
var mongoose = __importStar(require("mongoose"));
var morgan_1 = __importDefault(require("morgan"));
var passwords_1 = require("../utils/passwords");
var ADMIN = 'admin';
var USER = 'user';
var AccountTypes = [
    ADMIN,
    USER,
];
// Schema
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        enum: AccountTypes,
        default: USER,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
// Methods
// eslint-disable-next-line func-names
userSchema.methods.setPassword = function (password) {
    var _this = this;
    return passwords_1.hashPassword(password)
        .then(function (hashedPassword) {
        _this.password = hashedPassword;
        return true;
    })
        .catch(function (error) {
        morgan_1.default(error);
        return false;
    });
};
// eslint-disable-next-line func-names
userSchema.methods.passwordEquals = function (password) {
    return passwords_1.comparePassword(password, this.password);
};
// eslint-disable-next-line func-names
userSchema.methods.response = function () {
    return {
        username: this.username,
        accountType: this.accountType,
    };
};
exports.default = mongoose.model('User', userSchema);
