"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var reservationSchema = new mongoose_1.default.Schema({
    wycieczka_id: mongoose_1.default.Types.ObjectId,
    username: String,
    miejsca: Number,
});
// eslint-disable-next-line func-names
reservationSchema.methods.response = function () {
    return {
        miejsca: this.miejsca,
        wycieczka_id: this.wycieczka_id,
    };
};
exports.default = mongoose_1.default.model('Reservation', reservationSchema);
