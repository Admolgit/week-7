"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.transaction = exports.validate = exports.balance = void 0;
const zod_1 = __importDefault(require("zod"));
//const schema = z.Schema
exports.balance = zod_1.default.object({
    body: zod_1.default.object({
        balance: zod_1.default
            .number({
            required_error: "Balance is required and must be number",
        })
    }),
});
const validate = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    }
    catch (error) {
        return res.status(400).json(error.message);
    }
};
exports.validate = validate;
exports.transaction = zod_1.default.object({
    body: zod_1.default.object({
        senderAccount: zod_1.default
            .number({
            required_error: "Sender account number is required and must be number",
        }),
        recieverAccount: zod_1.default
            .number({
            required_error: "Receiver account number is required and must be number",
        }),
        amount: zod_1.default.number({
            required_error: "amount is required and must be number",
        }),
        transferDescription: zod_1.default.string({
            required_error: "transfer description is required and must be string",
        }),
    }),
});
exports.register = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default
            .string({
            required_error: "name not acceptable",
        }),
        email: zod_1.default
            .string({
            required_error: "Email unacceptable",
        }),
        password: zod_1.default
            .string({
            required_error: "password does not meet the required standard",
        })
    }),
});
