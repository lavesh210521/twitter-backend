import express from "express";
import { getAnyUserProfile, updateUser, viewUser } from "../services/userService.js";
import { auth } from "../middlewares/auth.js";
import { userProfileViewValidationRules, userUpdateValidationRules, validateInputs } from "../middlewares/validatior/userValidator.js";
import { handleValidationErrors } from "../middlewares/validatior/errorHandler.js";
import { validate } from "../middlewares/validatior/helper.js";
import { userTweetValidationRules } from "../middlewares/validatior/userTweetValidator.js";
import { getAllTweetsFromUser } from "../services/userTweetService.js";
import { getFollowValidationRules, userFollowValidationRules, userUnfollowValidationRules } from "../middlewares/validatior/userFollowValidator.js";
import { follow, getUserFollowers, getUserFollowings, unfollow } from "../services/userFollowService.js";

const userRouter = express.Router();

// User Routes
userRouter.get("/profile", auth, viewUser);
userRouter.get("/:userId/profile",validate(userProfileViewValidationRules),getAnyUserProfile);
userRouter.post("/update", auth, validate(userUpdateValidationRules), updateUser)
userRouter.get("/:userId/tweets", auth, validate(userTweetValidationRules), getAllTweetsFromUser)
// userRouter.get("/followings/:userId",auth,getUserFollowings);
// userRouter.get("/followers/:userId",auth,getUserFollowers);
userRouter.post("/follow", auth, validate(userFollowValidationRules), follow);
userRouter.post("/unfollow", auth, validate(userUnfollowValidationRules), unfollow);
userRouter.get("/:userId/followings",auth,validate(getFollowValidationRules), getUserFollowings);
//using getFollowingvalidationRules 
userRouter.get("/:userId/followers",auth,validate(getFollowValidationRules), getUserFollowers);

export { userRouter };    