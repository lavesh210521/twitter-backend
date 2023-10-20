import express from "express";
import { parse } from 'stack-trace';
const app = express();

import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import cors from "cors"

import { userRouter } from "./routes/user/userRoutes.js";
import { authRouter } from "./routes/auth/authRoutes.js";
import { tweetRouter } from "./routes/tweet/tweetRoutes.js";
import { globalHandler } from "./exception_handling/errorHandler.js";

dotenv.config();
process.env.TZ = "Asia/Calcutta";
//Before Middlewares
const options = {
    "origin": ['http://localhost:4200','https://65326d9c6df1900ca7f94250--unique-youtiao-b54161.netlify.app/'], // or use an array of allowed origins
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
app.use(globalHandler)
app.listen(process.env.PORT || 3000);