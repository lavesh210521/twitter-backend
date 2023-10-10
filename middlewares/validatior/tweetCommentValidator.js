import { body, param } from "express-validator";
import { Tweet } from "../../models/Index.js";

export const tweetCommentValidationRules = [
    param("tweetId")
        .exists()
        .notEmpty()
        .withMessage("Tweet Id is required!")
        .custom(async(value, { req }) => {
            const tweet = await Tweet.findOne({
                where: {
                    id: req.params.tweetId
                }
            });
            if(!tweet){
                let error = new Error("Invalid Tweet Id");
                error.code = 404;
                throw error;
            }
            return true;
        })
]
export const tweetCommentCreateValidationRules = [
    body("tweet")
        .exists()
        .notEmpty()
        .withMessage("tweet is required!"),
    body("imageUrl")
        .optional()
        .isURL()
        .withMessage("ImageUrl should be a url"),
    body("commentId")
        .exists()
        .notEmpty()
        .withMessage("comment Id is required!")
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