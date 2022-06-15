"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = exports.getTransaction = void 0;
// import axios from 'axios';
const uuid_1 = require("uuid");
const transaction_1 = __importDefault(require("../models/transaction"));
const createAccount_1 = __importDefault(require("../models/createAccount"));
(0, uuid_1.v4)();
const getTransaction = async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query;
        const transactionReciept = await transaction_1.default.find()
            .limit(limit * 1)
            .skip((page - 1) * limit);
        res.status(200).json({ total: transactionReciept.length, transactionReciept });
    }
    catch (error) {
        console.error(error.message);
    }
};
exports.getTransaction = getTransaction;
const createTransaction = async (req, res) => {
    const { senderAccount, recieverAccount, amount, transferDescription } = req.body;
    try {
        let senderAccDetails = await createAccount_1.default.findOne({ account: senderAccount });
        let recieverAccDetails = await createAccount_1.default.findOne({ account: recieverAccount });
        if (senderAccDetails.balance < amount) {
            throw new Error('Insufficient Balance');
        }
        let newSenderAccBalance = senderAccDetails.balance - amount;
        let newRecieverAccBalance = recieverAccDetails.balance + amount;
        await createAccount_1.default.findOneAndUpdate({ account: senderAccount }, { balance: newSenderAccBalance });
        await createAccount_1.default.findOneAndUpdate({ account: recieverAccount }, { balance: newRecieverAccBalance });
        let transferReciept = new transaction_1.default({
            reference: (0, uuid_1.v4)(),
            senderAccount,
            recieverAccount,
            amount,
            transferDescription,
            createdAt: new Date().toISOString()
        });
        await transferReciept.save();
        res.status(201).json(transferReciept);
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.createTransaction = createTransaction;
exports.default = {
    getTransaction: exports.getTransaction,
    createTransaction: exports.createTransaction,
};
