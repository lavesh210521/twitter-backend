import { body, param } from "express-validator";
import { Tweet } from "../../models/Index.js";

export const tweetCreateValidationRules = [
	body("tweet")
		.exists()
        .notEmpty()
        .withMessage("tweet is required!"),
	body("imageUrl")
    	.optional()
        .isURL()
]

export const tweetDeleteValidationRules = [
    param("tweetId")
        .custom(async(value,{req}) => {
            if(!req.params.tweetId){
                throw new Error("Tweet Id required!");
            }
            const tweet = await Tweet.findOne({
                where: {
                    id: req.params.tweetId
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
