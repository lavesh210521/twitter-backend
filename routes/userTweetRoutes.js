import express from "express";
import { auth } from "../middlewares/auth.js";
import { validate } from "../exception_handling/errorHandler.js";
import { userTweetValidationRules } from "../middlewares/validatior/userTweetValidator.js";
import { getAllTweetsFromUser } from "../services/userTweetService.js";

const userTweetRouter = express.Router();
//i think this route is not getting used will throw this out later!
userTweetRouter.get("", auth, validate(userTweetValidationRules), getAllTweetsFromUser);

export { userTweetRouter }

