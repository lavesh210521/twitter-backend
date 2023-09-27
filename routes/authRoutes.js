import express from "express";
import { signin,signout,signup } from "../controllers/AuthController.js";
import { signinValidationRules, signupValidationRules } from "../middlewares/validatior/authValidator.js";
import { validate } from "../middlewares/validatior/helper.js";
import { body } from "express-validator";


const authRouter = express.Router();

authRouter.post("/signup",validate(signupValidationRules),signup);
authRouter.post("/signin",validate(signinValidationRules),signin);
authRouter.post("/signout",signout);

export {authRouter};