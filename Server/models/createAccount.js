"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const accountSchema = new mongoose_1.default.Schema({
    account: {
        type: Number,
        require: true
    },
    balance: {
        type: Number,
        require: true
    },
    createdAt: {
        type: String,
        require: true
    }
});
const createAccount = mongoose_1.default.model("createaccount", accountSchema);
exports.default = createAccount;
