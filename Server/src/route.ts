import express from "express";
import { createBankAccount, getAllAccount }  from "../controllers/createAccount";
import { getTransaction, createTransaction }  from "../controllers/transaction";
import { balance, validate, transaction, register } from "../../inputValidator";
import { createRegisteredAccount, getUser,  getAllAccountRegistered,
} from "../controllers/register";
import   { checkRegAuthForAccount }
from "../Authentication/Auth/auth";
// import auth from "../Authentication/Middleware/auth";
import paginate from "../controllers/pagination"

var router = express.Router();

// Account creation route
router.post("/create-account", validate(balance), createBankAccount);
router.get("/allaccount", getAllAccount);

// Transaction Balances Route
router.get("/balances", getTransaction);
router.post("/balances", validate(transaction), createTransaction);

// Get Individual account
router.get("/me", getUser);

// Register user route
router.post("/register", createRegisteredAccount);
router.get("/register", paginate(register), getAllAccountRegistered);

// Login route
router.post("/login", checkRegAuthForAccount);

export default router;
