"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// import postRoutes from "./routes/Posts.js"
const route_1 = __importDefault(require("./src/route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// This is the middle ware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ limit: "30mb", extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/', route_1.default);
if (!config_1.default.get("jwtPrivateKey")) {
    console.error("FATAL ERROR: jwtPrivateKey is not defined");
    process.exit(1);
}
const CONNECTION_URL = "mongodb://localhost:27017/my-bank-app";
const PORT = process.env.PORT || 3700;
mongoose_1.default.connect(CONNECTION_URL, {})
    .then(() => console.log("Database is connected"))
    .catch(err => console.log(err.message));
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
// mongoose.set('useFindAndModify', true);
exports.default = app;
