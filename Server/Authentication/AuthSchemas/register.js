"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const registerSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true,
        minLength: 8,
        maxLength: 60
    },
    createdAt: {
        type: String
    }
});
registerSchema.methods.generateAuthToken = async function () {
    const token = jsonwebtoken_1.default.sign({ _id: this._id }, config_1.default.get("jwtPrivateKey"));
    return token;
};
const userAccount = mongoose_1.default.model("useraccount", registerSchema);
exports.default = userAccount;
