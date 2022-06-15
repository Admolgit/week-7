"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRegisteredAccount = exports.getUser = exports.getAllAccountRegistered = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const register_1 = __importDefault(require("../Authentication/AuthSchemas/register"));
const getAllAccountRegistered = async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query;
        const allRegisteredAccount = await register_1.default.find()
            .limit(limit * 1)
            .skip((page - 1) * limit);
        res.status(200).json({ total: allRegisteredAccount.length, allRegisteredAccount });
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.getAllAccountRegistered = getAllAccountRegistered;
const getUser = async (req, res, next) => {
    const user = await register_1.default.findById(req.email).select('-password');
    // console.log(user)
    res.status(200).json(user);
};
exports.getUser = getUser;
const createRegisteredAccount = async (req, res) => {
    let body = req.body;
    let user = await register_1.default.findOne({ email: body.email });
    if (user)
        return res.status(400).json("User already exist");
    let uniqueUser = new register_1.default({ ...body, createdAt: new Date().toISOString() });
    const salt = await bcrypt_1.default.genSalt(10);
    uniqueUser.password = await bcrypt_1.default.hash(uniqueUser.password, salt);
    try {
        await uniqueUser.save();
        const token = uniqueUser.generateAuthToken();
        res.header("x-auth-token", token).json(uniqueUser);
    }
    catch (error) {
        res.status(409).json(error.message);
    }
};
exports.createRegisteredAccount = createRegisteredAccount;
exports.default = {
    getAllAccountRegistered: exports.getAllAccountRegistered,
    getUser: exports.getUser,
    createRegisteredAccount: exports.createRegisteredAccount
};
