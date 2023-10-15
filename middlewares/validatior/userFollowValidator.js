import { body, query } from "express-validator";
import { Follow, User } from "../../models/Index.js";

export const userFollowValidationRules = [
    body("userId")
        .exists()
        .withMessage("User Id is required!")
        .notEmpty()
        .withMessage("User Id cannot be empty!")
        .isNumeric()
        .withMessage("User Id should be a number")
        .custom(async (value) => {
            const user = await User.findOne({
                where: {
                    id: value
                }
            });
            if (!user) {
                throw new Error();
            }
            return true;
        })
        .withMessage("Invalid User Id")
        .custom(async (value, {req}) => {
            const follow = await Follow.findOne({
                where: {
                    from_user_id: req.userId,
                    to_user_id: value
                }
            });
            if(follow){
                throw new Error();
            }
        })
        .withMessage("User Already Following"),
]

export const userRemoveFollowerValidationRules = [
    body("userId")
    .exists()
    .withMessage("User Id is required!")
    .notEmpty()
    .withMessage("User Id cannot be empty")
    .isNumeric()
    .withMessage("User Id should be a number")
    .escape()
    .custom(async (value, { req }) => {
        const follow = await Follow.findOne({
            where: {
                from_user_id: value ,
                to_user_id: req.userId
            }
        });
        if (!follow) {
            throw new Error("User is not present in follower list");
        }
        return true;
    }),
]
export const userUnfollowValidationRules = [
    body("userId")
        .exists()
        .withMessage("User Id is required!")
        .notEmpty()
        .withMessage("User Id cannot be null!")
        .isNumeric()
        .withMessage("User Id should be a number")
        .custom(async (value, { req }) => {
            const follow = await Follow.findOne({
                where: {
                    from_user_id: req.userId,
                    to_user_id: value
                }
            });
            if (!follow) {
                throw new Error();
            }
            return true;
        })
        .withMessage("User is not following this user"),
]

export const getFollowValidationRules = [
    query("userId")
        .custom((value) => {
            console.log("Called from validation" + value);
            if (value == undefined) {
                throw new Error();
            }
            return true;
        })
        .withMessage("User Id not found!")
]
