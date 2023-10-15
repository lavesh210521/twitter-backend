import express from "express";
const app = express();

import { auth } from "./middlewares/auth.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import cors from "cors"

import { userRouter } from "./routes/userRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import { tweetRouter } from "./routes/tweetRoutes.js";
import { reportError } from "./config/emailHandler.js";

dotenv.config();
process.env.TZ = "Asia/Calcutta";
//Before Middlewares
const options = {
    "origin": 'http://localhost:4200', // or use an array of allowed origins
    "methods": 'GET,HEAD,PUT,PATCH,POST,DELETE',
    "credentials": true, 
    "optionsSuccessStatus": 204
}
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use("/tweets",tweetRouter);
app.use("/auth",authRouter);
app.use("/users",userRouter);

//for invalid URL
app.use((req,res) => {
    res.status(400).json({error: "Invalid URL"});
});
app.use(async(err,req,res) => {
    console.log("caught by global error handler!");
    await reportError("Caught by Global Handler",err);
    res.status(500).json({error: "Internal Server Error!"});
})
app.listen(process.env.PORT || 3000);