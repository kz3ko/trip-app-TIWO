"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var flashDealSchema = new mongoose_1.default.Schema({
    expires_at: {
        type: Date,
        required: true,
    },
    starts_at: {
        type: Date,
        required: true,
    },
    wycieczka_id: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
    },
    discount: Number,
});
exports.default = mongoose_1.default.model('FlashDeal', flashDealSchema);
