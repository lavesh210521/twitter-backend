import { body, param } from "express-validator";
import { Tweet } from "../../models/Index.js";

export const tweetCommentValidationRules = [
    param("tweetId")
        .custom((value, { req }) => {
            if (!req.params.tweetId) {
                throw new Error("Tweet Id required!");
            }
            return true;
        })
]
export const tweetCommentCreateValidationRules = [
    body("tweet")
        .exists()
        .withMessage("please provide a tweet message"),
    body("imageUrl")
        .optional()
        .isURL(),
    body("commentId")
        .exists()
        .custom((value, { req }) => {
            const tweet = Tweet.findOne({
                where: {
                    id: req.body.commentId
                }
            });
            if (!tweet) {
                throw new Error("Invalid Tweet Id");
            }
            return true;
        })
]