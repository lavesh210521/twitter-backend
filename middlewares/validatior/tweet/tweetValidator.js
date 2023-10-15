import { body,query } from "express-validator";
import { Tweet } from "../../../models/Index.js";

export const tweetCreateValidationRules = [
	body("tweet")
		.exists()
        .withMessage("tweet is required!")
        .notEmpty()
        .withMessage("tweet cannot be empty"),
	body("imageUrl")
    	.optional()
        .isURL()
        .withMessage("ImageUrl should be a url")
]
export const tweetDeleteValidationRules = [
    query("tweetId")
    .exists()
    .withMessage("tweet Id is required!")
    .notEmpty()
    .withMessage("tweet Id cannot be null")
        .custom(async(value,{req}) => {
            if(!req.query.tweetId){
                throw new Error("Tweet Id is required!");
            }
            const tweet = await Tweet.findOne({
                where: {
                    id: req.query.tweetId
                }
            });
            if(!tweet){
                throw new Error("Invalid Tweet Id");
            }
            if(tweet.user_id != req.userId){
                console.log("Tweet -> " + tweet);
                console.log("Auth user id " + req.userId);
                throw new Error("Forbidden!");
            }
            return true;
        })
]
