import express from "express";
import { auth } from "../middlewares/auth.js";
import { validate } from "../middlewares/validatior/helper.js";
import { tweetCreateValidationRules, tweetDeleteValidationRules } from "../middlewares/validatior/tweetValidator.js";
import { createTweet, deleteTweet, getAllTweets } from "../services/tweetService.js";
import { tweetLikeValidationRules, tweetUnlikeValidationRules } from "../middlewares/validatior/tweetLikeValidator.js";
import { tweetLike, tweetUnlike } from "../services/tweetLikeService.js";
import { tweetCommentCreateValidationRules, tweetCommentValidationRules } from "../middlewares/validatior/tweetCommentValidator.js";
import { createComment, getComments } from "../services/tweetCommentService.js";
import { getAllTweetsFromFollowings } from "../services/userFollowTweetService.js";
const tweetRouter = express.Router();

tweetRouter.get("/",auth,getAllTweets);
tweetRouter.get("/:tweetId/comments",auth,validate(tweetCommentValidationRules),getComments);
tweetRouter.post("/create",auth,validate(tweetCreateValidationRules),createTweet);
tweetRouter.post("/:tweetId/like",auth,validate(tweetLikeValidationRules),tweetLike);
tweetRouter.post("/:tweetId/unlike",auth,validate(tweetUnlikeValidationRules),tweetUnlike);
tweetRouter.post("/comment",auth,validate(tweetCommentCreateValidationRules),createComment);
tweetRouter.delete("/:tweetId",auth,validate(tweetDeleteValidationRules),deleteTweet);
tweetRouter.get("/followings",auth,getAllTweetsFromFollowings);
export { tweetRouter}