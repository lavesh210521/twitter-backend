import express from "express";
import { signin, signout, signup } from "../../services/auth/authService.js"
import { signinValidationRules, signupValidationRules } from "../../middlewares/validatior/auth/authValidator.js";
import { validate } from "../../exception_handling/errorHandler.js";

const authRouter = express.Router();

authRouter.put("/signup", validate(signupValidationRules), signup);
authRouter.post("/signin", validate(signinValidationRules), signin);
authRouter.post("/signout", signout);

export { authRouter };