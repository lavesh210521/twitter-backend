import express from "express";
import { auth } from "../../middlewares/auth/auth.js";
import { validate } from "../../exception_handling/errorHandler.js";
import { userProfileViewValidationRules, userSearchValidationRules, userUpdateValidationRules } from "../../middlewares/validatior/user/userValidator.js";
import { userTweetValidationRules } from "../../middlewares/validatior/user/userTweetValidator.js";
import { getFollowValidationRules, userFollowValidationRules, userRemoveFollowerValidationRules, userUnfollowValidationRules } from "../../middlewares/validatior/user/userFollowValidator.js";
import { paginateValidationRules } from "../../middlewares/validatior/common/commonValidatior.js";
import { getAllTweetsFromUser } from "../../services/user/userTweetService.js";
import * as userController from "../../controllers/users/userController.js";
import * as userFollowController from "../../controllers/users/userFollowController.js";
const userRouter = express.Router();

userRouter.get("/auth/profile", auth, userController.getUser);
userRouter.get("/profile-with-follow", auth, validate(getFollowValidationRules), userFollowController.getUserWithFollow);
userRouter.get("/profile", validate(userProfileViewValidationRules), userController.getAnyUserProfile);
userRouter.patch("", auth, validate(userUpdateValidationRules), userController.updateUser)
userRouter.get("/tweets", auth, validate(userTweetValidationRules), getAllTweetsFromUser)
userRouter.put("/follow", auth, validate(userFollowValidationRules), userFollowController.follow);
userRouter.put("/unfollow", auth, validate(userUnfollowValidationRules), userFollowController.unfollow);
userRouter.put("/remove-follower", auth, validate(userRemoveFollowerValidationRules), userFollowController.removeFollower);
userRouter.get("/search", auth, validate(userSearchValidationRules), userController.getUsersBySearch);
userRouter.get("/auth/followings", auth, validate(paginateValidationRules), userFollowController.getAuthUserFollowings);
userRouter.get("/auth/followers", auth, validate(paginateValidationRules), userFollowController.getAuthUserFollowers);
//add pagination in follower-following of user's profile 
userRouter.get("/followings", auth, validate(getFollowValidationRules), userFollowController.getUserFollowings);
userRouter.get("/followers", auth, validate(getFollowValidationRules), userFollowController.getUserFollowers);
userRouter.get("/validate", auth, userController.validateUser);
export { userRouter };    