import express from "express";
import { auth } from "../middlewares/auth.js";
import { validate } from "../exception_handling/errorHandler.js";
import { tweetCreateValidationRules, tweetDeleteValidationRules } from "../middlewares/validatior/tweetValidator.js";
import { createTweet, deleteTweet, getAllTweetFromUserWithLikeAndComment, getAllTweets } from "../services/tweetService.js";
import { tweetLikeValidationRules, tweetUnlikeValidationRules } from "../middlewares/validatior/tweetLikeValidator.js";
import { tweetLike, tweetUnlike } from "../services/tweetLikeService.js";
import { tweetCommentCreateValidationRules, tweetCommentValidationRules } from "../middlewares/validatior/tweetCommentValidator.js";
import { createComment, getComments } from "../services/tweetCommentService.js";
import { getAllTweetsFromFollowings } from "../services/userFollowTweetService.js";
import { userExistValidationRules } from "../middlewares/validatior/userValidator.js";
import { paginateValidationRules } from "../middlewares/validatior/commonValidatior.js";

const tweetRouter = express.Router();

tweetRouter.get("", auth, validate(paginateValidationRules), getAllTweets);
tweetRouter.get("/comments", auth, validate(tweetCommentValidationRules), getComments);
tweetRouter.put("", auth, validate(tweetCreateValidationRules), createTweet);
tweetRouter.put("/like", auth, validate(tweetLikeValidationRules), tweetLike);
tweetRouter.put("/unlike", auth, validate(tweetUnlikeValidationRules), tweetUnlike);
tweetRouter.put("/comment", auth, validate(tweetCommentCreateValidationRules), createComment);
tweetRouter.delete("", auth, validate(tweetDeleteValidationRules), deleteTweet);
tweetRouter.get("/followings", auth, validate(paginateValidationRules), getAllTweetsFromFollowings);
tweetRouter.get("/users/with-likes-follows", auth, validate(userExistValidationRules), validate(paginateValidationRules), getAllTweetFromUserWithLikeAndComment);
export { tweetRouter }