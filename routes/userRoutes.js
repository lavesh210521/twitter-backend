import express from "express";
import { getAnyUserProfile, getUser, getUsersBySearch, updateUser, validateUser } from "../services/userService.js";
import { auth } from "../middlewares/auth.js";
import { userProfileViewValidationRules, userSearchValidationRules, userUpdateValidationRules, validateInputs } from "../middlewares/validatior/userValidator.js";
import { handleValidationErrors } from "../middlewares/validatior/errorHandler.js";
import { validate } from "../middlewares/validatior/helper.js";
import { userTweetValidationRules } from "../middlewares/validatior/userTweetValidator.js";
import { getAllTweetsFromUser } from "../services/userTweetService.js";
import { getFollowValidationRules, userFollowValidationRules, userRemoveFollowerValidationRules, userUnfollowValidationRules } from "../middlewares/validatior/userFollowValidator.js";
import { follow, getAuthUserFollowers, getAuthUserFollowings, getUserFollowers, getUserFollowings, getUserWithFollow, removeFollower, unfollow } from "../services/userFollowService.js";

const userRouter = express.Router();

// User Routes
userRouter.get("/profile", auth, getUser);
//using same rule; as it satisfied this request so i'm not creating other validation rule
userRouter.get("/:userId/profile-with-follow", auth,validate(getFollowValidationRules), getUserWithFollow);
userRouter.get("/:userId/profile",validate(userProfileViewValidationRules),getAnyUserProfile);
userRouter.post("/update", auth, validate(userUpdateValidationRules), updateUser)
userRouter.get("/:userId/tweets", auth, validate(userTweetValidationRules), getAllTweetsFromUser)
// userRouter.get("/followings/:userId",auth,getUserFollowings);
// userRouter.get("/followers/:userId",auth,getUserFollowers);
userRouter.post("/follow", auth, validate(userFollowValidationRules), follow);
userRouter.post("/unfollow", auth, validate(userUnfollowValidationRules), unfollow);
userRouter.post("/remove-follower",auth,validate(userRemoveFollowerValidationRules),removeFollower);
userRouter.get("/search/:searchKeyword",auth,validate(userSearchValidationRules),getUsersBySearch);
userRouter.get("/followings",auth,getAuthUserFollowings);
userRouter.get("/followers",auth,getAuthUserFollowers);
userRouter.get("/:userId/followings",auth,validate(getFollowValidationRules), getUserFollowings);
//using getFollowingvalidationRules 
userRouter.get("/:userId/followers",auth,validate(getFollowValidationRules), getUserFollowers);
userRouter.get("/validate",auth,validateUser);

export { userRouter };    