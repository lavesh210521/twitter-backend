import { body, param } from "express-validator";
import { Like, Tweet } from "../../models/Index.js";
import { Op } from "sequelize";

export const tweetLikeValidationRules = [
    param("tweetId")
        .custom(async (value, { req }) => {
            if (!req.params.tweetId) {
                throw new Error("Tweet Id required!");
            }
            const tweet = await Tweet.findOne({
                where: {
                    id: req.params.tweetId
                }
            });
            if (!tweet) {
                throw new Error("Invalid Tweet Id");
            }
            return true;
        })
]
export const tweetUnlikeValidationRules = [
    param("tweetId")
        .custom(async (value, { req }) => {
            if (!req.params.tweetId) {
                throw new Error("Tweet Id required!");
            }
            const tweet = await Like.findOne({
                where: {
                    [Op.and]: [
                        { user_id: req.userId },
                        { tweet_id: req.params.tweetId }
                    ]
                }
            });
            if (!tweet) {
                throw new Error("Cannot unlike!");
            }
            return true;
        })
]