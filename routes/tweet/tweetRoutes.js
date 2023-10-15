import express from "express";
import { auth } from "../../middlewares/auth/auth.js";
import { validate } from "../../exception_handling/errorHandler.js";
import { tweetCreateValidationRules, tweetDeleteValidationRules } from "../../middlewares/validatior/tweet/tweetValidator.js";
import { userExistValidationRules } from "../../middlewares/validatior/user/userValidator.js";
import { paginateValidationRules } from "../../middlewares/validatior/common/commonValidatior.js";
import { tweetLikeValidationRules, tweetUnlikeValidationRules } from "../../middlewares/validatior/tweet/tweetLikeValidator.js";
import { tweetCommentCreateValidationRules, tweetCommentValidationRules } from "../../middlewares/validatior/tweet/tweetCommentValidator.js";
import { createTweet, deleteTweet, getAllTweetFromUserWithLikeAndComment, getAllTweets } from "../../services/tweet/tweetService.js";
import { tweetLike, tweetUnlike } from "../../services/tweet/tweetLikeService.js";
import { createComment, getComments } from "../../services/tweet/tweetCommentService.js";
import { getAllTweetsFromFollowings } from "../../services/user/userFollowTweetService.js";

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