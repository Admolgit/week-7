"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createAccount_1 = require("../controllers/createAccount");
const transaction_1 = require("../controllers/transaction");
const inputValidator_1 = require("../../inputValidator");
const register_1 = require("../controllers/register");
const auth_1 = require("../Authentication/Auth/auth");
const auth_2 = __importDefault(require("../Authentication/Middleware/auth"));
const pagination_1 = __importDefault(require("../controllers/pagination"));
var router = express_1.default.Router();
// Account creation route
router.post("/create-account", auth_2.default, (0, inputValidator_1.validate)(inputValidator_1.balance), createAccount_1.createBankAccount);
router.get("/allaccount", auth_2.default, createAccount_1.getAllAccount);
// Transaction Balances Route
router.get("/balances", transaction_1.getTransaction);
router.post("/balances", auth_2.default, (0, inputValidator_1.validate)(inputValidator_1.transaction), transaction_1.createTransaction);
// Get Individual account
router.get("/me", auth_2.default, register_1.getUser);
// Register user route
router.post("/register", register_1.createRegisteredAccount);
router.get("/register", auth_2.default, (0, pagination_1.default)(inputValidator_1.register), register_1.getAllAccountRegistered);
// Login route
router.post("/login", auth_1.checkRegAuthForAccount);
exports.default = router;
