// validators.js
import { body, validationResult } from "express-validator";
import { User } from "../../models/Index.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

export const signupValidationRules = [
    body("first_name")
        .exists()
        .notEmpty()
        .withMessage("first_name is required!"),
    body("last_name")
        .exists()
        .notEmpty()
        .withMessage("last_name is required!"),
    body("username")
        .exists()
        .notEmpty()
        .withMessage("username is required!")
        .custom(async (value, { req, res }) => {
            const user = await User.findOne({
                where: {
                    username: req.body.username
                }
            });
            if (user && user.username == value) {
                throw new Error("username already exists!");
            }
            return true;
        }),
    body('email')
        .exists()
        .notEmpty()
        .withMessage("email is required!")
        .isEmail()
        .withMessage("Email is not in proper format!")
        .custom(async (value, { req }) => {
            const user = await User.findOne({
                where: {
                    email: req.body.email,
                }
            });
            console.log(user);
            if (user && user.email == value) {
                throw new Error()
            }

            return true;
        })

        .withMessage('Email already Exists!'),
    body('password')
        .exists()
        .notEmpty()
        .withMessage("password is required!")
        .isLength({ min: 8 })
        .withMessage('Password is too short'),
    body('confirm_password')
        .exists()
        .notEmpty()
        .withMessage("confirm_password is required!")
        .custom((value, { req }) => {
            if (value != req.body.password) {
                throw new Error("Password and Confirm Password doesn't matches");
            }
            return true;
        })
]

export const signinValidationRules = [
    body('email')
        .exists()
        .isEmail()
        .withMessage("Email is not in proper format!"),
    body('password')
        .exists()
        .isLength({ min: 8 })
        .withMessage('Password is too short')
        .custom(async (value, { req }) => {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });
            console.log(user);
            const isPasswordSame = await bcrypt.compare(req.body.password, user.password);
            console.log(isPasswordSame);
            if (!isPasswordSame) {
                throw new Error();
            }
            return true;
        }).withMessage("Invalid Credentials")
]


