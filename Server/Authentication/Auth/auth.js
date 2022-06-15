"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRegAuthForAccount = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const register_1 = __importDefault(require("../AuthSchemas/register"));
const inputValidator_1 = require("../../../inputValidator");
const checkRegAuthForAccount = async (req, res) => {
    try {
        let body = (0, inputValidator_1.validate)(req.body);
        let user = await register_1.default.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).json("Invalid email or password");
        const validPassword = await bcrypt_1.default.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(400).json("Invalid email or password");
        const token = await user.generateAuthToken();
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(409).json(error.message);
    }
};
exports.checkRegAuthForAccount = checkRegAuthForAccount;
exports.default = {
    checkRegAuthForAccount: exports.checkRegAuthForAccount
};
