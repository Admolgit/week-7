import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose"
import cors from "cors";
import dotenv from "dotenv";

// import postRoutes from "./routes/Posts.js"
import router from "./src/route";

dotenv.config();

const app = express();


// This is the middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use(express.json());
app.use(cors());

app.use('/', router);

const CONNECTION_URL = "mongodb://localhost:27017/my-bank-app";

const PORT = process.env.PORT || 3700;

mongoose.connect(CONNECTION_URL, {})
.then(() => console.log("Database is connected"))
.catch(err => console.log(err.message));

app.listen(PORT, () => console.log(`Server running on ${PORT}`))

export default app;
