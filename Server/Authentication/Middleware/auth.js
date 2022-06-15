"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
function auth(req, res, next) {
    const token = req.header("x-auth-token");
    if (!token)
        return res.status(401).json("Access Denied. No token provided.");
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, config_1.default.get("jwtPrivateKey"));
        req.user = decodedToken;
        next();
    }
    catch (ex) {
        res.status(400).json("Invalid token.");
    }
}
exports.default = auth;
