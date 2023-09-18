import express from "express";
const app = express();
import { signin,signout,signup } from "./controllers/AuthController.js";
import { User } from "./models/Index.js";
import { auth } from "./middlewares/auth.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
dotenv.config();

//Before Middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.post("/signup",signup);
app.post("/signin",signin);
app.post("/signout",signout);

app.get("/",(req,res) => {
    res.send("Welcome to " + req.url + " page");
});

app.use("/Protected",auth);
app.get("/Protected", (req,res) => {
    res.send("If you are here that means u must be an Authentic User");
})
app.listen(process.env.PORT || 3000);