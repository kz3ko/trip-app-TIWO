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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureSchema = void 0;
var defaultData = {
    rezerwowane: 0,
    oceny: [],
    galeria: [],
};
var ensureSchema = function (wycieczka) { return (__assign(__assign(__assign({}, defaultData), wycieczka), { dataRozpoczecia: new Date(wycieczka.dataRozpoczecia), dataZakonczenia: new Date(wycieczka.dataZakonczenia) })); };
exports.ensureSchema = ensureSchema;
