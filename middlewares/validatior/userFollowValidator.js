import { body, param } from "express-validator";
import { Follow, User } from "../../models/Index.js";

export const userFollowValidationRules = [
    body("userId")
        .exists()
        .notEmpty()
        .withMessage("User Id is required!")
        .isNumeric()
        .withMessage("User Id should be a number")
        .custom(async (value) => {
            const user = await User.findOne({
                where: {
                    id: value
                }
            });
            if (!user) {
                throw new Error("Invalid User Id");
            }
            return true;
        }),
]


export const userRemoveFollowerValidationRules = [
    body("userId")
    .exists()
    .notEmpty()
    .withMessage("user Id is required!")
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
            throw new Error("user is not present in follower list");
        }
        return true;
    }),
]
export const userUnfollowValidationRules = [
    body("userId")
        .exists()
        .notEmpty()
        .withMessage("User Id is required!")
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
                throw new Error("Invalid Parameters!");
            }
            return true;
        }),
]

export const getFollowValidationRules = [
    param("userId")
        .custom((value) => {
            console.log("Called from validation" + value);
            if (value == undefined) {
                throw new Error("userId not found!");
            }
            return true;
        })
]
