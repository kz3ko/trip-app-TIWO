"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var tripSchema = new mongoose_1.default.Schema({
    nazwa: {
        type: String,
        required: true,
    },
    docelowyKraj: {
        type: String,
        required: true,
    },
    dataRozpoczecia: {
        type: Date,
        required: true,
    },
    dataZakonczenia: {
        type: Date,
        required: true,
    },
    cena: {
        type: Number,
        required: true,
    },
    maxMiejsc: {
        type: Number,
        required: true,
    },
    opis: {
        type: String,
        required: true,
    },
    zdjecie: {
        type: String,
        required: true,
    },
    rezerwowane: {
        type: Number,
        required: true,
    },
    oceny: [{
            username: { type: String, required: true },
            gwiazdki: { type: Number, required: true },
            komentarz: { type: String, required: true },
        }],
    galeria: [String],
    deleted: Boolean,
});
// eslint-disable-next-line func-names
tripSchema.methods.response = function () {
    return __assign({}, this.toJSON());
};
exports.default = mongoose_1.default.model('Trip', tripSchema);
