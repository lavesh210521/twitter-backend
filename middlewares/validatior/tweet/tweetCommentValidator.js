import { body, query } from "express-validator";
import { Tweet } from "../../../models/Index.js";

export const tweetCommentValidationRules = [
    query("tweetId")
        .exists()
        .withMessage("Tweet Id is required!")
        .notEmpty()
        .withMessage("Tweet Id cannot be empty")
        .custom(async (value, { req }) => {
            const tweet = await Tweet.findOne({
                where: {
                    id: req.query.tweetId
                }
            });
            if (!tweet) {
                throw new Error("Invalid Tweet Id");
            }
            return true;
        })
]
export const tweetCommentCreateValidationRules = [
    body("tweet")
        .exists()
        .withMessage("tweet is required!")
        .notEmpty()
        .withMessage("tweet cannot be empty!"),
    body("imageUrl")
        .optional()
        .isURL()
        .withMessage("ImageUrl should be a url"),
    body("commentId")
        .exists()
        .withMessage("commentId is required!")
        .notEmpty()
        .withMessage("comment Id cannot be null")
        .custom(async (value, { req }) => {
            const tweet = await Tweet.findOne({
                where: {
                    id: req.body.commentId
                }
            });
            if (!tweet) {
                throw new Error("Invalid Comment Id");
            }
            return true;
        })
]