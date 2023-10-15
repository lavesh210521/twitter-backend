import express from "express";
import { auth } from "../middlewares/auth.js";
import { validate } from "../exception_handling/errorHandler.js";
import { userProfileViewValidationRules, userSearchValidationRules, userUpdateValidationRules } from "../middlewares/validatior/user/userValidator.js";
import { userTweetValidationRules } from "../middlewares/validatior/user/userTweetValidator.js";
import { getFollowValidationRules, userFollowValidationRules, userRemoveFollowerValidationRules, userUnfollowValidationRules } from "../middlewares/validatior/user/userFollowValidator.js";
import { paginateValidationRules } from "../middlewares/validatior/common/commonValidatior.js";
import { getAnyUserProfile, getUser, getUsersBySearch, updateUser, validateUser } from "../services/userService.js";
import { getAllTweetsFromUser } from "../services/userTweetService.js";
import { follow, getAuthUserFollowers, getAuthUserFollowings, getUserFollowers, getUserFollowings, getUserWithFollow, removeFollower, unfollow } from "../services/user/userFollowService.js";
const userRouter = express.Router();

userRouter.get("/auth/profile", auth, getUser);
userRouter.get("/profile-with-follow", auth, validate(getFollowValidationRules), getUserWithFollow);
userRouter.get("/profile", validate(userProfileViewValidationRules), getAnyUserProfile);
userRouter.patch("", auth, validate(userUpdateValidationRules), updateUser)
userRouter.get("/tweets", auth, validate(userTweetValidationRules), getAllTweetsFromUser)
userRouter.put("/follow", auth, validate(userFollowValidationRules), follow);
userRouter.put("/unfollow", auth, validate(userUnfollowValidationRules), unfollow);
userRouter.put("/remove-follower", auth, validate(userRemoveFollowerValidationRules), removeFollower);
userRouter.get("/search", auth, validate(userSearchValidationRules), getUsersBySearch);
userRouter.get("/auth/followings", auth, validate(paginateValidationRules), getAuthUserFollowings);
userRouter.get("/auth/followers", auth, validate(paginateValidationRules), getAuthUserFollowers);
//add pagination in follower-following of user's profile 
userRouter.get("/followings", auth, validate(getFollowValidationRules), getUserFollowings);
userRouter.get("/followers", auth, validate(getFollowValidationRules), getUserFollowers);
userRouter.get("/validate", auth, validateUser);
export { userRouter };    