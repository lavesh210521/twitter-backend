import express from "express";
import { auth } from "../../middlewares/auth/auth.js";
import { validate } from "../../exception_handling/errorHandler.js";
import { tweetCreateValidationRules, tweetDeleteValidationRules } from "../../middlewares/validatior/tweet/tweetValidator.js";
import { userExistValidationRules } from "../../middlewares/validatior/user/userValidator.js";
import { paginateValidationRules } from "../../middlewares/validatior/common/commonValidatior.js";
import { tweetLikeValidationRules, tweetUnlikeValidationRules } from "../../middlewares/validatior/tweet/tweetLikeValidator.js";
import { tweetCommentCreateValidationRules, tweetCommentValidationRules } from "../../middlewares/validatior/tweet/tweetCommentValidator.js";
import * as tweetController from "../../controllers/tweets/tweetController.js";
import * as tweetCommentController from "../../controllers/tweets/tweetCommentController.js";
import * as tweetLikeController from "../../controllers/tweets/tweetLikeController.js";
import * as userFollowTweetController from "../../controllers/users/userFollowTweetController.js";
const tweetRouter = express.Router();

tweetRouter.get("", auth, validate(paginateValidationRules), tweetController.getAllTweets);
tweetRouter.get("/comments", auth, validate(tweetCommentValidationRules), tweetCommentController.getComments);
tweetRouter.put("", auth, validate(tweetCreateValidationRules), tweetController.createTweet);
tweetRouter.put("/like", auth, validate(tweetLikeValidationRules), tweetLikeController.tweetLike);
tweetRouter.put("/unlike", auth, validate(tweetUnlikeValidationRules), tweetLikeController.tweetUnlike);
tweetRouter.put("/comment", auth, validate(tweetCommentCreateValidationRules), tweetCommentController.createComment);
tweetRouter.delete("", auth, validate(tweetDeleteValidationRules), tweetController.deleteTweet);
tweetRouter.get("/followings", auth, validate(paginateValidationRules), userFollowTweetController.getAllTweetsFromFollowings);
tweetRouter.get("/users/with-likes-follows", auth, validate(userExistValidationRules), validate(paginateValidationRules), tweetController.getAllTweetFromUserWithLikeAndComment);
export { tweetRouter }