import express from "express";
const app = express();
import { signin,signout,signup } from "./controllers/AuthController.js";
import { User } from "./models/Index.js";
import { validate } from "./middlewares/validatior/helper.js";
import { auth } from "./middlewares/auth.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import { findOne, index } from "./controllers/TweetsController.js";
import cors from "cors"


import { userRouter } from "./routes/userRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import { tweetRouter } from "./routes/tweetRoutes.js";
import { body } from "express-validator";
import { userTweetRouter } from "./routes/userTweetRoutes.js";
import moment from "moment-timezone";

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
//for timezone
app.use((req,res,next) => {
    // const timeZone = 'Asia/Kolkata';
    // const currentTimeInTimeZone = moment().tz(timeZone).format();
    // console.log(currentTimeInTimeZone);
    // res.locals.currentTimeInTimeZone = currentTimeInTimeZone;
    next();
});

app.use("/Protected",auth);
app.get("/Protected", (req,res) => {
    res.send("If you are here that means u must be an Authentic User");
})
// app.get("/tweets",auth,index);
// app.get("/tweets/:tweetId",auth,findOne);
app.use("/tweets",tweetRouter);
app.use("/auth",authRouter);
app.use("/users",userRouter);
app.use((req,res) => {
    res.status(400).json({error: "Invalid URL"});
})
// app.post("/signin",validate(SigninInputs),signin);
app.listen(process.env.PORT || 3000);