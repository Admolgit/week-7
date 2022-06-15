"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBankAccount = exports.getAllAccount = void 0;
const accountgenerator_1 = __importDefault(require("../../utilities/accountgenerator"));
const createAccount_1 = __importDefault(require("../models/createAccount"));
const getAllAccount = async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query;
        const allAccount = await createAccount_1.default.find()
            .limit(limit * 1)
            .skip((page - 1) * limit);
        res.status(200).json({ total: allAccount.length, allAccount });
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.getAllAccount = getAllAccount;
const createBankAccount = async (req, res) => {
    let body = req.body;
    let uniqueAcc = await (0, accountgenerator_1.default)(10);
    let uniqueUser = new createAccount_1.default({ account: uniqueAcc, ...body, createdAt: new Date().toISOString() });
    try {
        await uniqueUser.save();
        res.status(201).json(uniqueUser);
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.createBankAccount = createBankAccount;
exports.default = {
    createBankAccount: exports.createBankAccount,
    getAllAccount: exports.getAllAccount
};
