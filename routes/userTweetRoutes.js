import express from "express";
import { auth } from "../middlewares/auth.js";
import { validate } from "../middlewares/validatior/helper.js";
import { userTweetValidationRules } from "../middlewares/validatior/userTweetValidator.js";
import { getAllTweetsFromUser } from "../services/userTweetService.js";

const userTweetRouter = express.Router();

userTweetRouter.get("",auth,validate(userTweetValidationRules),getAllTweetsFromUser);

export {userTweetRouter}

