"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const transactionSchema = new mongoose_1.default.Schema({
    reference: {
        type: String,
        require: true
    },
    senderAccount: {
        type: Number,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    receiverAccount: {
        type: Number,
        require: true
    },
    transferDescription: {
        type: String,
        require: true
    },
    createdAt: {
        type: String,
        require: true
    },
});
const Transaction = mongoose_1.default.model('transaction', transactionSchema);
exports.default = Transaction;
