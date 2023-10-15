import {body } from "express-validator";
import { Like, Tweet } from "../../models/Index.js";
import { Op } from "sequelize";

export const tweetLikeValidationRules = [
    body("tweetId")
        .exists()
        .withMessage("Tweet Id is required!")
        .notEmpty()
        .withMessage("Tweet Id cannot be empty!")
        .custom(async (value, { req }) => {
            const tweet = await Tweet.findOne({
                where: {
                    id: req.body.tweetId
                }
            });
            if (!tweet) {
                throw new Error();
            }
            return true;
        })
        .withMessage("Invalid Tweet Id!")
]
export const tweetUnlikeValidationRules = [
    body("tweetId")
        .exists()
        .withMessage("Tweet Id is required!")
        .notEmpty()
        .withMessage("Tweet Id cannot be empty!")
        .custom(async (value, { req }) => {
            const like = await Like.findOne({
                where: {
                    [Op.and]: [
                        { user_id: req.userId },
                        { tweet_id: req.body.tweetId }
                    ]
                }
            });
            if (!like) {
                throw new Error("Like doesn't exist");
            }
            return true;
        })
]